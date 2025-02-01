package com.soccer.championship.controller;

import com.soccer.championship.domain.dto.EnumDto;
import com.soccer.championship.domain.dto.MatchDTO;
import com.soccer.championship.domain.dto.UpdateMatchDTO;
import com.soccer.championship.domain.enums.MatchStatus;
import com.soccer.championship.domain.enums.PlayerPosition;
import com.soccer.championship.service.MatchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
@RequestMapping("/api/v1/matches")
@RequiredArgsConstructor
@Tag(name = "Partidas", description = "API para gerenciamento de partidas")
public class MatchController {

  private final MatchService matchService;

  @GetMapping
  @Operation(summary = "Listar todas as partidas", description = "Retorna uma lista paginada de partidas")
  public ResponseEntity<Page<MatchDTO>> findAll(Pageable pageable) {
    return ResponseEntity.ok(matchService.findAll(pageable));
  }

  @GetMapping("/championship/{championshipId}")
  @Operation(summary = "Listar partidas por campeonato", description = "Retorna uma lista paginada de partidas de um campeonato específico")
  public ResponseEntity<Page<MatchDTO>> findByChampionship(
    @PathVariable Long championshipId,
    @Parameter(hidden = true) Pageable pageable) {
    return ResponseEntity.ok(matchService.findByChampionship(championshipId, pageable));
  }

  @GetMapping("/{id}")
  @Operation(summary = "Buscar partida por ID", description = "Retorna uma partida específica pelo seu ID")
  public ResponseEntity<MatchDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(matchService.findById(id));
  }

  @PostMapping
  @Operation(summary = "Criar partida", description = "Cria uma nova partida")
  public ResponseEntity<MatchDTO> create(@RequestBody @Valid MatchDTO matchDTO) {
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(matchService.create(matchDTO));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Atualizar partida", description = "Atualiza uma partida existente")
  public ResponseEntity<MatchDTO> update(
    @PathVariable Long id,
    @RequestBody @Valid UpdateMatchDTO updateMatchDTO) {
    return ResponseEntity.ok(matchService.update(id, updateMatchDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Excluir partida", description = "Exclui uma partida existente")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    matchService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/status")
  @Operation(summary = "Obtém todos os status da partida", description = "Obtém todos os status da partida")
  public ResponseEntity<List<EnumDto>> obterTodos() {
    return ResponseEntity.ok(MatchStatus.obterTodos());
  }
}
