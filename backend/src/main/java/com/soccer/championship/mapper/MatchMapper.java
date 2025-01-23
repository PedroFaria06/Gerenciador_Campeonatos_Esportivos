package com.soccer.championship.mapper;


import com.soccer.championship.domain.dto.MatchDTO;
import com.soccer.championship.domain.entity.Championship;
import com.soccer.championship.domain.entity.Match;
import com.soccer.championship.domain.entity.Team;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {TeamMapper.class, ChampionshipMapper.class})
public interface MatchMapper {

  @Mapping(target = "championshipId", source = "championship.id")
  @Mapping(target = "homeTeamId", source = "homeTeam.id")
  @Mapping(target = "awayTeamId", source = "awayTeam.id")
  MatchDTO toDTO(Match match);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "championship", source = "championshipId", qualifiedByName = "championshipFromId")
  @Mapping(target = "homeTeam", source = "homeTeamId", qualifiedByName = "teamFromId")
  @Mapping(target = "awayTeam", source = "awayTeamId", qualifiedByName = "teamFromId")
  @Mapping(target = "events", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  Match toEntity(MatchDTO dto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "championship", source = "championshipId", qualifiedByName = "championshipFromId")
  @Mapping(target = "homeTeam", source = "homeTeamId", qualifiedByName = "teamFromId")
  @Mapping(target = "awayTeam", source = "awayTeamId", qualifiedByName = "teamFromId")
  @Mapping(target = "events", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  void updateEntity(MatchDTO dto, @MappingTarget Match match);

  @Named("championshipFromId")
  default Championship championshipFromId(Long id) {
    if (id == null) {
      return null;
    }
    Championship championship = new Championship();
    championship.setId(id);
    return championship;
  }

  @Named("teamFromId")
  default Team teamFromId(Long id) {
    if (id == null) {
      return null;
    }
    Team team = new Team();
    team.setId(id);
    return team;
  }
}
