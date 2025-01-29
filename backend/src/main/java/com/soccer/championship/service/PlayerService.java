package com.soccer.championship.service;

import com.soccer.championship.domain.dto.PlayerDTO;
import com.soccer.championship.domain.entity.Player;
import com.soccer.championship.exception.BusinessException;
import com.soccer.championship.exception.ResourceNotFoundException;
import com.soccer.championship.exception.UniqueConstraintViolationException;
import com.soccer.championship.mapper.PlayerMapper;
import com.soccer.championship.repository.PlayerRepository;
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
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;
    private final PlayerMapper playerMapper;

    @Transactional(readOnly = true)
    public Page<PlayerDTO> findAll(Pageable pageable) {
        log.debug("Buscando todos os jogadores com paginação");
        return playerRepository.findAll(pageable)
                .map(playerMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<PlayerDTO> findByTeam(Long teamId, Pageable pageable) {
        log.debug("Buscando jogadores do time com ID: {}", teamId);
        return playerRepository.findByTeamId(teamId, pageable)
                .map(playerMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public PlayerDTO findById(Long id) {
        log.debug("Buscando jogador por ID: {}", id);
        return playerRepository.findById(id)
                .map(playerMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Jogador não encontrado com ID: " + id));
    }

    public PlayerDTO create(PlayerDTO playerDTO) {
        log.info("Criando novo jogador: {}", playerDTO);

        validateTeam(playerDTO.teamId());
        validateShirtNumber(playerDTO);

        Player player = playerMapper.toEntity(playerDTO);
        player = playerRepository.save(player);
        return playerMapper.toDTO(player);
    }

    @Transactional
    public PlayerDTO update(Long id, PlayerDTO playerDTO) {
        log.debug("Atualizando jogador com ID {}: {}", id, playerDTO);

        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Jogador não encontrado com ID: " + id));

        validateTeam(playerDTO.teamId());
        validateShirtNumberForUpdate(playerDTO, player);

        playerMapper.updateEntity(playerDTO, player);
        player = playerRepository.save(player);
        return playerMapper.toDTO(player);
    }

    @Transactional
    public void delete(Long id) {
        log.debug("Excluindo jogador com ID: {}", id);

        if (!playerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Jogador não encontrado com ID: " + id);
        }

        playerRepository.deleteById(id);
    }

    private void validateTeam(Long teamId) {
        if (teamId != null && !teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException("Time não encontrado com ID: " + teamId);
        }
    }

    private void validateShirtNumber(PlayerDTO playerDTO) {
        if (playerDTO.teamId() != null && playerDTO.shirtNumber() != null &&
            playerRepository.existsByTeamIdAndShirtNumber(playerDTO.teamId(), playerDTO.shirtNumber())) {
            throw new BusinessException(
                String.format("Já existe um jogador com o número %d no time com ID %d",
                    playerDTO.shirtNumber(), playerDTO.teamId()));
        }
    }

    private void validateShirtNumberForUpdate(PlayerDTO playerDTO, Player existingPlayer) {
        if (playerDTO.teamId() != null && playerDTO.shirtNumber() != null &&
            !playerDTO.shirtNumber().equals(existingPlayer.getShirtNumber()) &&
            playerRepository.existsByTeamIdAndShirtNumber(playerDTO.teamId(), playerDTO.shirtNumber())) {
            throw new BusinessException(
                String.format("Já existe um jogador com o número %d no time com ID %d",
                    playerDTO.shirtNumber(), playerDTO.teamId()));
        }
    }

}
