package com.soccer.championship.controller;

import com.soccer.championship.domain.dto.PlayerDTO;
import com.soccer.championship.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/players")
@RequiredArgsConstructor
@Tag(name = "Jogadores", description = "API para gerenciamento de jogadores")
public class PlayerController {

  private final PlayerService playerService;

  @GetMapping
  @Operation(summary = "Listar todos os jogadores", description = "Retorna uma lista paginada de jogadores")
  public ResponseEntity<Page<PlayerDTO>> findAll(Pageable pageable) {
    return ResponseEntity.ok(playerService.findAll(pageable));
  }

  @GetMapping("/team/{teamId}")
  @Operation(summary = "Listar jogadores por time", description = "Retorna uma lista paginada de jogadores de um time específico")
  public ResponseEntity<Page<PlayerDTO>> findByTeam(@PathVariable Long teamId, Pageable pageable) {
    return ResponseEntity.ok(playerService.findByTeam(teamId, pageable));
  }

  @GetMapping("/{id}")
  @Operation(summary = "Buscar jogador por ID", description = "Retorna um jogador específico pelo seu ID")
  public ResponseEntity<PlayerDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(playerService.findById(id));
  }

  @PostMapping
  @Operation(summary = "Criar jogador", description = "Cria um novo jogador")
  public ResponseEntity<PlayerDTO> create(@RequestBody @Valid PlayerDTO playerDTO) {
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(playerService.create(playerDTO));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Atualizar jogador", description = "Atualiza um jogador existente")
  public ResponseEntity<PlayerDTO> update(@PathVariable Long id, @RequestBody @Valid PlayerDTO playerDTO) {
    return ResponseEntity.ok(playerService.update(id, playerDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Excluir jogador", description = "Exclui um jogador existente")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    playerService.delete(id);
    return ResponseEntity.noContent().build();
  }

}
