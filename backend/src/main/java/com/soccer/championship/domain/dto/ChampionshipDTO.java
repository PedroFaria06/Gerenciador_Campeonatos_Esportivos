package com.soccer.championship.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.soccer.championship.domain.enums.ChampionshipStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.Set;

public record ChampionshipDTO(
  Long id,

  @NotBlank(message = "O nome do campeonato é obrigatório")
  @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
  String name,

  @NotNull(message = "A data de início é obrigatória")
  @JsonFormat(pattern = "yyyy-MM-dd") 
  LocalDate startDate,

  @JsonFormat(pattern = "yyyy-MM-dd") 
  LocalDate endDate,

  @NotBlank(message = "A temporada é obrigatória")
  @Size(max = 10, message = "A temporada deve ter no máximo 10 caracteres")
  String season,

  @NotNull(message = "O status é obrigatório")
  ChampionshipStatus status,

  Set<Long> teamIds
) {}
