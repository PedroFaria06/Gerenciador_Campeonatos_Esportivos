package com.soccer.championship.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/match-events")
@RequiredArgsConstructor
@Tag(name = "Eventos de Partida", description = "API para gerenciamento de eventos de partida")
public class MatchEventController {

}
