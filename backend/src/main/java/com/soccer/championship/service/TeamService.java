package com.soccer.championship.service;

import com.soccer.championship.domain.dto.TeamDTO;
import com.soccer.championship.domain.entity.Team;
import com.soccer.championship.exception.ResourceNotFoundException;
import com.soccer.championship.exception.UniqueConstraintViolationException;
import com.soccer.championship.mapper.TeamMapper;
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
public class TeamService {

  private final TeamRepository teamRepository;

  @Transactional(readOnly = true)
  public Page<TeamDTO> findAll(Pageable pageable) {
    log.debug("Buscando todos os times com paginação");

    return teamRepository.findAllTeams(pageable);
  }

  @Transactional(readOnly = true)
  public TeamDTO findById(Long id) {
    log.debug("Buscando time por ID: {}", id);

    return teamRepository.findTeamById(id);
  }

  @Transactional
  public TeamDTO create(TeamDTO teamDTO) {
    log.debug("Criando novo time: {}", teamDTO);

    if (teamRepository.existsByNameIgnoreCase(teamDTO.name())) {
      throw new UniqueConstraintViolationException("Já existe um time com o nome: " + teamDTO.name());
    }

    Team team = TeamMapper.INSTANCE.toEntity(teamDTO);
    team = teamRepository.save(team);

    return TeamMapper.INSTANCE.toDTO(team);
  }

  @Transactional
  public TeamDTO update(Long id, TeamDTO teamDTO) {
    log.debug("Atualizando time com ID {}: {}", id, teamDTO);

    Team team = teamRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Time não encontrado com ID: " + id));

    if (!team.getName().equalsIgnoreCase(teamDTO.name()) &&
      teamRepository.existsByNameIgnoreCase(teamDTO.name())) {
      throw new UniqueConstraintViolationException("Já existe um time com o nome: " + teamDTO.name());
    }

    TeamMapper.INSTANCE.updateEntity(teamDTO, team);

    team = teamRepository.save(team);

    return TeamMapper.INSTANCE.toDTO(team);
  }

  @Transactional
  public void delete(Long id) {
    log.debug("Excluindo time com ID: {}", id);

    if (!teamRepository.existsById(id)) {
      throw new ResourceNotFoundException("Time não encontrado com ID: " + id);
    }

    teamRepository.deleteById(id);
  }
}
