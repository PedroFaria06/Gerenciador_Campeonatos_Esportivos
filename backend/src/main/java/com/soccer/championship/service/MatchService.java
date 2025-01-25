package com.soccer.championship.service;

import com.soccer.championship.domain.ChampionshipStatus;
import com.soccer.championship.domain.MatchStatus;
import com.soccer.championship.domain.dto.MatchDTO;
import com.soccer.championship.domain.dto.UpdateMatchDTO;
import com.soccer.championship.domain.entity.Championship;
import com.soccer.championship.domain.entity.ChampionshipTeam;
import com.soccer.championship.domain.entity.Match;
import com.soccer.championship.exception.BusinessException;
import com.soccer.championship.exception.ResourceNotFoundException;
import com.soccer.championship.mapper.MatchMapper;
import com.soccer.championship.repository.ChampionshipRepository;
import com.soccer.championship.repository.ChampionshipTeamRepository;
import com.soccer.championship.repository.MatchRepository;
import com.soccer.championship.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchService {

  private final MatchRepository matchRepository;
  private final ChampionshipRepository championshipRepository;
  private final TeamRepository teamRepository;
  private final ChampionshipTeamRepository championshipTeamRepository;
  private final MatchMapper matchMapper;

  @Transactional(readOnly = true)
  public Page<MatchDTO> findAll(Pageable pageable) {
    log.debug("Buscando todas as partidas com paginação");
    return matchRepository.findAll(pageable)
      .map(matchMapper::toDTO);
  }

  @Transactional(readOnly = true)
  public Page<MatchDTO> findByChampionship(Long championshipId, Pageable pageable) {
    log.debug("Buscando partidas do campeonato ID: {}", championshipId);
    return matchRepository.findByChampionshipId(championshipId, pageable)
      .map(matchMapper::toDTO);
  }

  @Transactional(readOnly = true)
  public MatchDTO findById(Long id) {
    log.debug("Buscando partida por ID: {}", id);
    return matchRepository.findById(id)
      .map(matchMapper::toDTO)
      .orElseThrow(() -> new ResourceNotFoundException("Partida não encontrada com ID: " + id));
  }

  @Transactional
  public MatchDTO create(MatchDTO matchDTO) {
    log.debug("Criando nova partida: {}", matchDTO);

    validateChampionship(matchDTO.championshipId());
    validateTeams(matchDTO);
    validateRound(matchDTO);

    Match match = matchMapper.toEntity(matchDTO);
    match = matchRepository.save(match);
    return matchMapper.toDTO(match);
  }

  @Transactional
  public MatchDTO update(Long id, UpdateMatchDTO updateMatchDTO) {
    Match match = matchRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Partida não encontrada"));

    // Se estiver alterando para FINISHED, valida e atualiza as estatísticas
    if (updateMatchDTO.status() == MatchStatus.FINISHED && match.getStatus() != MatchStatus.FINISHED) {
      updateChampionshipStats(match);
    }

    if (updateMatchDTO.status() != null) {
      match.setStatus(updateMatchDTO.status());
    }
    if (updateMatchDTO.matchDate() != null) {
      match.setMatchDate(updateMatchDTO.matchDate());
    }
    if (updateMatchDTO.homeTeamGoals() != null) {
      match.setHomeTeamGoals(updateMatchDTO.homeTeamGoals());
    }
    if (updateMatchDTO.awayTeamGoals() != null) {
      match.setAwayTeamGoals(updateMatchDTO.awayTeamGoals());
    }

    match = matchRepository.save(match);
    return matchMapper.toDTO(match);
  }

  @Transactional
  public void delete(Long id) {
    log.debug("Excluindo partida com ID: {}", id);

    Match match = matchRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Partida não encontrada com ID: " + id));

    if (match.getStatus() != MatchStatus.SCHEDULED && match.getStatus() != MatchStatus.CANCELLED) {
      throw new BusinessException("Não é possível excluir uma partida que já foi iniciada ou finalizada");
    }

    matchRepository.deleteById(id);
  }

  @Transactional
  public void updateMatchScore(Long matchId, Integer homeTeamGoals, Integer awayTeamGoals) {
    log.debug("Atualizando placar da partida ID: {}", matchId);
    Match match = matchRepository.findById(matchId)
      .orElseThrow(() -> new ResourceNotFoundException("Partida não encontrada"));

    if (match.getStatus() != MatchStatus.IN_PROGRESS) {
      throw new BusinessException("Só é possível atualizar o placar de partidas em andamento");
    }

    match.setHomeTeamGoals(homeTeamGoals);
    match.setAwayTeamGoals(awayTeamGoals);
    matchRepository.save(match);

    // Atualizar estatísticas do campeonato
    updateChampionshipStats(match);
  }

  private void validateChampionship(Long championshipId) {
    Championship championship = championshipRepository.findById(championshipId)
      .orElseThrow(() -> new ResourceNotFoundException("Campeonato não encontrado com ID: " + championshipId));

    if (championship.getStatus() != ChampionshipStatus.IN_PROGRESS) {
      throw new BusinessException("Só é possível criar/atualizar partidas em campeonatos em andamento");
    }
  }

  private void validateTeams(MatchDTO matchDTO) {
    if (matchDTO.homeTeamId().equals(matchDTO.awayTeamId())) {
      throw new BusinessException("O time mandante não pode ser o mesmo que o visitante");
    }

    if (!teamRepository.existsById(matchDTO.homeTeamId())) {
      throw new ResourceNotFoundException("Time mandante não encontrado com ID: " + matchDTO.homeTeamId());
    }

    if (!teamRepository.existsById(matchDTO.awayTeamId())) {
      throw new ResourceNotFoundException("Time visitante não encontrado com ID: " + matchDTO.awayTeamId());
    }
  }

  private void validateRound(MatchDTO matchDTO) {
    if (matchRepository.existsByChampionshipAndRoundAndTeam(
      matchDTO.championshipId(), matchDTO.round(), matchDTO.homeTeamId()) ||
      matchRepository.existsByChampionshipAndRoundAndTeam(
        matchDTO.championshipId(), matchDTO.round(), matchDTO.awayTeamId())) {
      throw new BusinessException("Um ou ambos os times já possuem partida nesta rodada");
    }
  }

  private void validateRoundForUpdate(MatchDTO matchDTO, Match existingMatch) {
    if (!matchDTO.round().equals(existingMatch.getRound()) &&
      (matchRepository.existsByChampionshipAndRoundAndTeam(
        matchDTO.championshipId(), matchDTO.round(), matchDTO.homeTeamId()) ||
        matchRepository.existsByChampionshipAndRoundAndTeam(
          matchDTO.championshipId(), matchDTO.round(), matchDTO.awayTeamId()))) {
      throw new BusinessException("Um ou ambos os times já possuem partida na nova rodada");
    }
  }

  private void validateMatchStatus(Match match, MatchDTO matchDTO) {
    if (match.getStatus() == MatchStatus.FINISHED && matchDTO.status() != MatchStatus.FINISHED) {
      throw new BusinessException("Não é possível alterar o status de uma partida finalizada");
    }
  }

  private void updateChampionshipStats(Match match) {
    Championship championship = match.getChampionship();

    // Busca os registros ChampionshipTeam
    ChampionshipTeam homeTeamStats = championshipTeamRepository.findByChampionshipAndTeam(
        championship.getId(), match.getHomeTeam().getId())
      .orElseThrow(() -> new BusinessException("Time mandante não encontrado no campeonato"));

    ChampionshipTeam awayTeamStats = championshipTeamRepository.findByChampionshipAndTeam(
        championship.getId(), match.getAwayTeam().getId())
      .orElseThrow(() -> new BusinessException("Time visitante não encontrado no campeonato"));

    // Atualiza estatísticas do time mandante
    homeTeamStats.setMatchesPlayed(homeTeamStats.getMatchesPlayed() + 1);
    homeTeamStats.setGoalsFor(homeTeamStats.getGoalsFor() + match.getHomeTeamGoals());
    homeTeamStats.setGoalsAgainst(homeTeamStats.getGoalsAgainst() + match.getAwayTeamGoals());

    // Atualiza estatísticas do time visitante
    awayTeamStats.setMatchesPlayed(awayTeamStats.getMatchesPlayed() + 1);
    awayTeamStats.setGoalsFor(awayTeamStats.getGoalsFor() + match.getAwayTeamGoals());
    awayTeamStats.setGoalsAgainst(awayTeamStats.getGoalsAgainst() + match.getHomeTeamGoals());

    // Atualiza vitórias, derrotas, empates e pontos
    if (match.getHomeTeamGoals() > match.getAwayTeamGoals()) {
      // Vitória do time mandante
      homeTeamStats.setVictories(homeTeamStats.getVictories() + 1);
      homeTeamStats.setPoints(homeTeamStats.getPoints() + 3);
      awayTeamStats.setDefeats(awayTeamStats.getDefeats() + 1);
    } else if (match.getHomeTeamGoals() < match.getAwayTeamGoals()) {
      // Vitória do time visitante
      awayTeamStats.setVictories(awayTeamStats.getVictories() + 1);
      awayTeamStats.setPoints(awayTeamStats.getPoints() + 3);
      homeTeamStats.setDefeats(homeTeamStats.getDefeats() + 1);
    } else {
      // Empate
      homeTeamStats.setDraws(homeTeamStats.getDraws() + 1);
      homeTeamStats.setPoints(homeTeamStats.getPoints() + 1);
      awayTeamStats.setDraws(awayTeamStats.getDraws() + 1);
      awayTeamStats.setPoints(awayTeamStats.getPoints() + 1);
    }

    // Salva as atualizações
    championshipTeamRepository.save(homeTeamStats);
    championshipTeamRepository.save(awayTeamStats);
  }
}
