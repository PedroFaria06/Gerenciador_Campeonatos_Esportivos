package com.soccer.championship.domain.dto;

import com.soccer.championship.domain.enums.MatchStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDateTime;

public record MatchDTO(
    Long id,

    @NotNull(message = "O ID do campeonato é obrigatório")
    Long championshipId,

    @NotNull(message = "O ID do time mandante é obrigatório")
    Long homeTeamId,

    @NotNull(message = "O ID do time visitante é obrigatório")
    Long awayTeamId,

    @NotNull(message = "A data da partida é obrigatória")
    LocalDateTime matchDate,

    @PositiveOrZero(message = "O número de gols deve ser maior ou igual a zero")
    Integer homeTeamGoals,

    @PositiveOrZero(message = "O número de gols deve ser maior ou igual a zero")
    Integer awayTeamGoals,

    @NotNull(message = "O status da partida é obrigatório")
    MatchStatus status,

    @NotNull(message = "A rodada é obrigatória")
    @PositiveOrZero(message = "A rodada deve ser maior ou igual a zero")
    Integer round
) {}
