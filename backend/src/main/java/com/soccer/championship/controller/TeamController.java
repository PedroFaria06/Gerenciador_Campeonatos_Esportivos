package com.soccer.championship.controller;

import com.soccer.championship.domain.dto.TeamDTO;
import com.soccer.championship.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/teams")
@RequiredArgsConstructor
@Tag(name = "Times", description = "API para gerenciamento de times")
public class TeamController {
  private final TeamService teamService;

  @GetMapping
  @Operation(summary = "Listar todos os times", description = "Retorna uma lista paginada de times")
  public ResponseEntity<Page<TeamDTO>> findAll(@Parameter(hidden = true) Pageable pageable) {
    return ResponseEntity.ok(teamService.findAll(pageable));
  }

  @GetMapping("/{id}")
  @Operation(summary = "Buscar time por ID", description = "Retorna um time específico pelo seu ID")
  public ResponseEntity<TeamDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(teamService.findById(id));
  }

  @PostMapping
  @Operation(summary = "Criar time", description = "Cria um novo time")
  public ResponseEntity<TeamDTO> create(@RequestBody @Valid TeamDTO teamDTO) {

    TeamDTO team = teamService.create(teamDTO);

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(team.id())
      .toUri())
      .body(team);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Atualizar time", description = "Atualiza um time existente")
  public ResponseEntity<TeamDTO> update(@PathVariable Long id, @RequestBody @Valid TeamDTO teamDTO) {
    return ResponseEntity.ok(teamService.update(id, teamDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Excluir time", description = "Exclui um time existente")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    teamService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
