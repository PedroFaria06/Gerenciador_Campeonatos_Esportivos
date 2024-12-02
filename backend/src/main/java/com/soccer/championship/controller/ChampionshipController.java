package com.soccer.championship.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/championships")
@RequiredArgsConstructor
@Tag(name = "Campeonatos", description = "API para gerenciamento de campeonatos")
public class ChampionshipController {

}
