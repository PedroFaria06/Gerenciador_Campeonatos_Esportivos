package com.soccer.championship.domain.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record PlayerDTO(
    Long id,
    
    @NotBlank(message = "O nome do jogador é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    String name,
    
    @NotNull(message = "A data de nascimento é obrigatória")
    @Past(message = "A data de nascimento deve ser no passado")
    LocalDate birthDate,
    
    @NotBlank(message = "A posição é obrigatória")
    @Size(max = 50, message = "A posição deve ter no máximo 50 caracteres")
    String position,
    
    @Min(value = 1, message = "O número da camisa deve ser maior que 0")
    @Max(value = 99, message = "O número da camisa deve ser menor que 100")
    Integer shirtNumber,
    
    Long teamId
) {}
