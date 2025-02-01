package com.soccer.championship.controller;


import com.soccer.championship.domain.dto.ChampionshipDTO;
import com.soccer.championship.domain.dto.ChampionshipTeamDTO;
import com.soccer.championship.domain.dto.ChampionshipTeamsDTO;
import com.soccer.championship.domain.dto.EnumDto;
import com.soccer.championship.domain.enums.ChampionshipStatus;
import com.soccer.championship.domain.enums.MatchStatus;
import com.soccer.championship.service.ChampionshipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/championships")
@RequiredArgsConstructor
@Tag(name = "Campeonatos", description = "API para gerenciamento de campeonatos")
public class ChampionshipController {

  private final ChampionshipService championshipService;

  @GetMapping
  @Operation(summary = "Listar todos os campeonatos", description = "Retorna uma lista paginada de campeonatos")
  public ResponseEntity<Page<ChampionshipDTO>> findAll(Pageable pageable) {
    return ResponseEntity.ok(championshipService.findAll(pageable));
  }

  @GetMapping("/status/{status}")
  @Operation(summary = "Listar campeonatos por status", description = "Retorna uma lista paginada de campeonatos com um status específico")
  public ResponseEntity<Page<ChampionshipDTO>> findByStatus(
    @PathVariable ChampionshipStatus status,
    Pageable pageable) {
    return ResponseEntity.ok(championshipService.findByStatus(status, pageable));
  }

  @GetMapping("/{id}")
  @Operation(summary = "Buscar campeonato por ID", description = "Retorna um campeonato específico pelo seu ID")
  public ResponseEntity<ChampionshipDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(championshipService.findById(id));
  }

  @GetMapping("/{id}/standings")
  @Operation(summary = "Obter classificação", description = "Retorna a classificação atual do campeonato")
  public ResponseEntity<List<ChampionshipTeamDTO>> getStandings(@PathVariable Long id) {
    return ResponseEntity.ok(championshipService.getStandings(id));
  }

  @PostMapping
  @Operation(summary = "Criar campeonato", description = "Cria um novo campeonato")
  public ResponseEntity<ChampionshipDTO> create(@RequestBody @Valid ChampionshipDTO championshipDTO) {
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(championshipService.create(championshipDTO));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Atualizar campeonato", description = "Atualiza um campeonato existente")
  public ResponseEntity<ChampionshipDTO> update(
    @PathVariable Long id,
    @RequestBody @Valid ChampionshipDTO championshipDTO) {
    return ResponseEntity.ok(championshipService.update(id, championshipDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Excluir campeonato", description = "Exclui um campeonato existente")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    championshipService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{id}/teams")
  @Operation(summary = "Adicionar times ao campeonato", description = "Adiciona uma lista de times ao campeonato")
  public ResponseEntity<Void> addTeams(
    @PathVariable("id") Long championshipId,
    @RequestBody @Valid ChampionshipTeamsDTO teamsDTO) {
    championshipService.addTeams(championshipId, teamsDTO.teamIds());
    return ResponseEntity.ok().build();
  }

  @GetMapping("/status")
  @Operation(summary = "Obtém todos os status do campeonato", description = "Obtém todos os status do campeonato")
  public ResponseEntity<List<EnumDto>> obterTodos() {
    return ResponseEntity.ok(ChampionshipStatus.obterTodos());
  }

}
