package com.soccer.championship.mapper;

import com.soccer.championship.domain.dto.MatchEventDTO;
import com.soccer.championship.domain.entity.Match;
import com.soccer.championship.domain.entity.MatchEvent;
import com.soccer.championship.domain.entity.Player;
import com.soccer.championship.repository.MatchRepository;
import com.soccer.championship.repository.PlayerRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = {PlayerMapper.class})
public abstract class MatchEventMapper {

  @Autowired
  private MatchRepository matchRepository;

  @Autowired
  private PlayerRepository playerRepository;

  @Mapping(target = "matchId", source = "match.id")
  @Mapping(target = "playerId", source = "player.id")
  public abstract MatchEventDTO toDTO(MatchEvent event);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "match", source = "matchId", qualifiedByName = "matchFromId")
  @Mapping(target = "player", source = "playerId", qualifiedByName = "playerFromId")
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  public abstract MatchEvent toEntity(MatchEventDTO dto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "match", source = "matchId", qualifiedByName = "matchFromId")
  @Mapping(target = "player", source = "playerId", qualifiedByName = "playerFromId")
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  public abstract void updateEntity(MatchEventDTO dto, @MappingTarget MatchEvent event);

  @Named("matchFromId")
  public Match matchFromId(Long id) {
    if (id == null) {
      return null;
    }
    return matchRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("Match not found with id: " + id));
  }

  @Named("playerFromId")
  public Player playerFromId(Long id) {
    if (id == null) {
      return null;
    }
    return playerRepository.findByIdWithTeam(id)
      .orElseThrow(() -> new IllegalArgumentException("Player not found with id: " + id));
  }
}
