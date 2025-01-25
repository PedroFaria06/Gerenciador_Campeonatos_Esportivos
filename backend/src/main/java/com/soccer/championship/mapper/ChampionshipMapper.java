package com.soccer.championship.mapper;

import com.soccer.championship.domain.dto.ChampionshipDTO;
import com.soccer.championship.domain.dto.ChampionshipTeamDTO;
import com.soccer.championship.domain.entity.Championship;
import com.soccer.championship.domain.entity.ChampionshipTeam;
import org.mapstruct.*;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface ChampionshipMapper {

  @Mapping(target = "teamIds", expression = "java(getTeamIds(championship))")
  ChampionshipDTO toDTO(Championship championship);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "teams", ignore = true)
  @Mapping(target = "matches", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  Championship toEntity(ChampionshipDTO dto);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "teams", ignore = true)
  @Mapping(target = "matches", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  void updateEntity(ChampionshipDTO dto, @MappingTarget Championship championship);

  @Mapping(target = "teamName", source = "team.name")
  @Mapping(target = "teamId", source = "team.id")
  @Mapping(target = "championshipId", source = "championship.id")
  @Mapping(target = "goalDifference", expression = "java(championshipTeam.getGoalDifference())")
  ChampionshipTeamDTO toChampionshipTeamDTO(ChampionshipTeam championshipTeam);

  default Set<Long> getTeamIds(Championship championship) {
    if (championship == null || championship.getTeams() == null) {
      return null;
    }
    return championship.getTeams().stream()
      .map(team -> team.getTeam().getId())
      .collect(Collectors.toSet());
  }
}
