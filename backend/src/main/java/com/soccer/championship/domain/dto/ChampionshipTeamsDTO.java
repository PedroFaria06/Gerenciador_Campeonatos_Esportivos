package com.soccer.championship.domain.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record ChampionshipTeamsDTO(@NotEmpty(message = "A lista de IDs dos times não pode estar vazia") Set<Long> teamIds) {}
