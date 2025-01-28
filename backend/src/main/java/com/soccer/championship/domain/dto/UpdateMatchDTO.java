package com.soccer.championship.domain.dto;


import com.soccer.championship.domain.enums.MatchStatus;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDateTime;

public record UpdateMatchDTO(
    MatchStatus status,

    LocalDateTime matchDate,

    @PositiveOrZero(message = "O número de gols deve ser maior ou igual a zero")
    Integer homeTeamGoals,

    @PositiveOrZero(message = "O número de gols deve ser maior ou igual a zero")
    Integer awayTeamGoals
) {}
