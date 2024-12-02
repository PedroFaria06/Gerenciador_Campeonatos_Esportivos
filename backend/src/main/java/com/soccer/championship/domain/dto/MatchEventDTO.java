package com.soccer.championship.domain.dto;

import com.soccer.championship.domain.entity.MatchEventType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record MatchEventDTO(
    Long id,
    
    @NotNull(message = "O ID da partida é obrigatório")
    Long matchId,
    
    @NotNull(message = "O ID do jogador é obrigatório")
    Long playerId,
    
    @NotNull(message = "O tipo do evento é obrigatório")
    MatchEventType eventType,
    
    @NotNull(message = "O minuto do evento é obrigatório")
    @PositiveOrZero(message = "O minuto do evento deve ser maior ou igual a zero")
    Integer eventMinute,
    
    @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres")
    String description
) {}
