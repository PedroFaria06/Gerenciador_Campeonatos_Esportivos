package com.soccer.championship.service;

import com.soccer.championship.domain.dto.ChampionshipDTO;
import com.soccer.championship.domain.dto.ChampionshipTeamDTO;
import com.soccer.championship.domain.entity.Championship;
import com.soccer.championship.domain.entity.Team;
import com.soccer.championship.domain.enums.ChampionshipStatus;
import com.soccer.championship.exception.BusinessException;
import com.soccer.championship.exception.ResourceNotFoundException;
import com.soccer.championship.mapper.ChampionshipMapper;
import com.soccer.championship.repository.ChampionshipRepository;
import com.soccer.championship.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChampionshipService {

  private final ChampionshipRepository championshipRepository;
  private final TeamRepository teamRepository;
  private final ChampionshipMapper championshipMapper;

  @Transactional(readOnly = true)
  public Page<ChampionshipDTO> findAll(Pageable pageable) {
    log.debug("Buscando todos os campeonatos com paginação");
    return championshipRepository.findAll(pageable)
      .map(championshipMapper::toDTO);
  }

  @Transactional(readOnly = true)
  public Page<ChampionshipDTO> findByStatus(ChampionshipStatus status, Pageable pageable) {
    log.debug("Buscando campeonatos com status: {}", status);
    return championshipRepository.findByStatus(status, pageable)
      .map(championshipMapper::toDTO);
  }

  @Transactional(readOnly = true)
  public ChampionshipDTO findById(Long id) {
    log.debug("Buscando campeonato por ID: {}", id);
    return championshipRepository.findById(id)
      .map(championshipMapper::toDTO)
      .orElseThrow(() -> new ResourceNotFoundException("Campeonato não encontrado com ID: " + id));
  }

  @Transactional(readOnly = true)
  public List<ChampionshipTeamDTO> getStandings(Long id) {
    log.debug("Buscando classificação do campeonato ID: {}", id);
    Championship championship = championshipRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Campeonato não encontrado com ID: " + id));

    return championship.getTeams().stream()
      .map(championshipMapper::toChampionshipTeamDTO)
      .sorted((t1, t2) -> {
        if (!t1.points().equals(t2.points())) {
          return t2.points().compareTo(t1.points());
        }
        if (!t1.victories().equals(t2.victories())) {
          return t2.victories().compareTo(t1.victories());
        }
        if (!t1.goalDifference().equals(t2.goalDifference())) {
          return t2.goalDifference().compareTo(t1.goalDifference());
        }
        return t2.goalsFor().compareTo(t1.goalsFor());
      })
      .collect(Collectors.toList());
  }

  @Transactional
  public ChampionshipDTO create(ChampionshipDTO championshipDTO) {
    log.debug("Criando novo campeonato: {}", championshipDTO);

    validateNameAndSeason(championshipDTO);

    Championship championship = championshipMapper.toEntity(championshipDTO);

    if (championshipDTO.teamIds() != null && !championshipDTO.teamIds().isEmpty()) {
      addTeamsToChampionship(championship, championshipDTO.teamIds());
    }

    championship = championshipRepository.save(championship);
    return championshipMapper.toDTO(championship);
  }

  @Transactional
  public ChampionshipDTO update(Long id, ChampionshipDTO championshipDTO) {
    log.debug("Atualizando campeonato com ID {}: {}", id, championshipDTO);

    Championship championship = championshipRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Campeonato não encontrado com ID: " + id));

    if (!championship.getName().equals(championshipDTO.name()) ||
      !championship.getSeason().equals(championshipDTO.season())) {
      validateNameAndSeason(championshipDTO);
    }

    championshipMapper.updateEntity(championshipDTO, championship);

    if (championshipDTO.teamIds() != null) {
      championship.getTeams().clear();
      addTeamsToChampionship(championship, championshipDTO.teamIds());
    }

    championship = championshipRepository.save(championship);
    return championshipMapper.toDTO(championship);
  }

  @Transactional
  public void delete(Long id) {
    log.debug("Excluindo campeonato com ID: {}", id);

    Championship championship = championshipRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Campeonato não encontrado com ID: " + id));

    if (championship.getStatus() == ChampionshipStatus.IN_PROGRESS) {
      throw new BusinessException("Não é possível excluir um campeonato que já está em andamento ou finalizado");
    }

    championshipRepository.deleteById(id);
  }

  @Transactional
  public void addTeams(Long championshipId, Set<Long> teamIds) {
    log.debug("Adicionando times {} ao campeonato ID: {}", teamIds, championshipId);

    Championship championship = championshipRepository.findById(championshipId)
      .orElseThrow(() -> new ResourceNotFoundException("Campeonato não encontrado com ID: " + championshipId));

    List<Team> teams = teamRepository.findAllById(teamIds);
    if (teams.size() != teamIds.size()) {
      throw new ResourceNotFoundException("Um ou mais times não foram encontrados");
    }

    teams.forEach(championship::addTeam);

    championshipRepository.save(championship);
  }

  private void validateNameAndSeason(ChampionshipDTO championshipDTO) {
    if (championshipRepository.existsByNameAndSeason(championshipDTO.name(), championshipDTO.season())) {
      throw new BusinessException(
        String.format("Já existe um campeonato com o nome '%s' na temporada %s",
          championshipDTO.name(), championshipDTO.season()));
    }
  }

  private void addTeamsToChampionship(Championship championship, Set<Long> teamIds) {
    teamIds.forEach(teamId -> {
      Team team = teamRepository.findById(teamId)
        .orElseThrow(() -> new ResourceNotFoundException("Time não encontrado com ID: " + teamId));
      championship.addTeam(team);
    });
  }
}
