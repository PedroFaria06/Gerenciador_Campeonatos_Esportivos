package com.soccer.championship.domain.dto;

public record ChampionshipTeamDTO(
    Long championshipId,
    Long teamId,
    String teamName,
    Integer points,
    Integer matchesPlayed,
    Integer victories,
    Integer draws,
    Integer defeats,
    Integer goalsFor,
    Integer goalsAgainst,
    Integer goalDifference
) {}
