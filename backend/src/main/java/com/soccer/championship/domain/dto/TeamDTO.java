package com.soccer.championship.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TeamDTO(
    Long id,
    
    @NotBlank(message = "O nome do time é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    String name,
    
    @Past(message = "A data de fundação deve ser no passado")
    LocalDate foundationDate,
    
    @Size(max = 100, message = "O nome da cidade deve ter no máximo 100 caracteres")
    String city,
    
    @Size(min = 2, max = 2, message = "O estado deve ter 2 caracteres")
    String state
) {}
