package com.soccer.championship.service;

import com.soccer.championship.domain.MatchEventType;
import com.soccer.championship.domain.MatchStatus;
import com.soccer.championship.domain.dto.MatchEventDTO;
import com.soccer.championship.domain.entity.Match;
import com.soccer.championship.domain.entity.MatchEvent;
import com.soccer.championship.domain.entity.Player;
import com.soccer.championship.exception.BusinessException;
import com.soccer.championship.exception.ResourceNotFoundException;
import com.soccer.championship.mapper.MatchEventMapper;
import com.soccer.championship.repository.MatchEventRepository;
import com.soccer.championship.repository.MatchRepository;
import com.soccer.championship.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchEventService {

  private final MatchEventRepository matchEventRepository;
  private final MatchRepository matchRepository;
  private final PlayerRepository playerRepository;
  private final MatchEventMapper matchEventMapper;

  @Transactional(readOnly = true)
  public Page<MatchEventDTO> findByMatch(Long matchId, Pageable pageable) {
    log.debug("Buscando eventos da partida ID: {}", matchId);
    return matchEventRepository.findByMatchId(matchId, pageable)
      .map(matchEventMapper::toDTO);
  }

  @Transactional(readOnly = true)
  public MatchEventDTO findById(Long id) {
    log.debug("Buscando evento por ID: {}", id);
    return matchEventRepository.findById(id)
      .map(matchEventMapper::toDTO)
      .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com ID: " + id));
  }

  @Transactional
  public MatchEventDTO create(MatchEventDTO eventDTO) {
    log.debug("Criando novo evento: {}", eventDTO);

    Match match = validateMatch(eventDTO.matchId());
    Player player = validatePlayer(eventDTO.playerId());
    validateEventTime(match, eventDTO.eventMinute());

    MatchEvent event = matchEventMapper.toEntity(eventDTO);
    event.setPlayer(player); // Garantindo que o player está corretamente setado

    if (eventDTO.eventType() == MatchEventType.GOAL ||
      eventDTO.eventType() == MatchEventType.OWN_GOAL ||
      eventDTO.eventType() == MatchEventType.PENALTY_SCORED) {
      updateMatchScore(match, event);
    }

    event = matchEventRepository.save(event);
    return matchEventMapper.toDTO(event);
  }

  @Transactional
  public void delete(Long id) {
    log.debug("Excluindo evento com ID: {}", id);

    MatchEvent event = matchEventRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com ID: " + id));

    if (event.getMatch().getStatus() == MatchStatus.FINISHED) {
      throw new BusinessException("Não é possível excluir eventos de uma partida finalizada");
    }

    // Se for um gol, atualiza o placar
    if (event.getEventType() == MatchEventType.GOAL ||
      event.getEventType() == MatchEventType.OWN_GOAL ||
      event.getEventType() == MatchEventType.PENALTY_SCORED) {
      revertMatchScore(event);
    }

    matchEventRepository.deleteById(id);
  }

  private Match validateMatch(Long matchId) {
    Match match = matchRepository.findById(matchId)
      .orElseThrow(() -> new ResourceNotFoundException("Partida não encontrada com ID: " + matchId));

    if (match.getStatus() != MatchStatus.IN_PROGRESS) {
      throw new BusinessException("Só é possível registrar eventos em partidas em andamento");
    }

    return match;
  }

  private Player validatePlayer(Long playerId) {
    return playerRepository.findByIdWithTeam(playerId)
      .orElseThrow(() -> new ResourceNotFoundException("Jogador não encontrado com ID: " + playerId));
  }

  private void validateEventTime(Match match, Integer eventMinute) {
    if (eventMinute < 0 || eventMinute > 120) {
      throw new BusinessException("O minuto do evento deve estar entre 0 e 120");
    }
  }

  private void updateMatchScore(Match match, MatchEvent event) {
    if (match.getStatus() != MatchStatus.IN_PROGRESS) {
      throw new BusinessException("Só é possível registrar gols em partidas em andamento");
    }

    // Busca o time do jogador que fez o evento
    Player player = event.getPlayer();
    if (player == null || player.getTeam() == null) {
      throw new BusinessException("Jogador ou time não encontrado");
    }

    if (event.getEventType() == MatchEventType.OWN_GOAL) {
      // Em caso de gol contra, o gol é computado para o time adversário
      if (player.getTeam().equals(match.getHomeTeam())) {
        match.setAwayTeamGoals(match.getAwayTeamGoals() + 1);
      } else {
        match.setHomeTeamGoals(match.getHomeTeamGoals() + 1);
      }
    } else if (event.getEventType() == MatchEventType.GOAL ||
      event.getEventType() == MatchEventType.PENALTY_SCORED) {
      // Para gols normais e pênaltis convertidos
      if (player.getTeam().equals(match.getHomeTeam())) {
        match.setHomeTeamGoals(match.getHomeTeamGoals() + 1);
      } else if (player.getTeam().equals(match.getAwayTeam())) {
        match.setAwayTeamGoals(match.getAwayTeamGoals() + 1);
      } else {
        throw new BusinessException("O jogador não pertence a nenhum dos times da partida");
      }
    }

    matchRepository.save(match);
  }

  private void revertMatchScore(MatchEvent event) {
    Match match = event.getMatch();
    if (event.getEventType() == MatchEventType.OWN_GOAL) {
      if (event.getPlayer().getTeam().equals(match.getHomeTeam())) {
        match.setAwayTeamGoals(match.getAwayTeamGoals() - 1);
      } else {
        match.setHomeTeamGoals(match.getHomeTeamGoals() - 1);
      }
    } else {
      if (event.getPlayer().getTeam().equals(match.getHomeTeam())) {
        match.setHomeTeamGoals(match.getHomeTeamGoals() - 1);
      } else {
        match.setAwayTeamGoals(match.getAwayTeamGoals() - 1);
      }
    }
    matchRepository.save(match);
  }
}
