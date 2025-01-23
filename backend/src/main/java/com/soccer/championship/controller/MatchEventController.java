package com.soccer.championship.controller;

import com.soccer.championship.domain.dto.MatchEventDTO;
import com.soccer.championship.service.MatchEventService;
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
@RequestMapping("/api/v1/match-events")
@RequiredArgsConstructor
@Tag(name = "Eventos de Partida", description = "API para gerenciamento de eventos de partida")
public class MatchEventController {

  private final MatchEventService matchEventService;

  @GetMapping("/match/{matchId}")
  @Operation(summary = "Listar eventos por partida", description = "Retorna uma lista paginada de eventos de uma partida específica")
  public ResponseEntity<Page<MatchEventDTO>> findByMatch(@PathVariable Long matchId, Pageable pageable) {
    return ResponseEntity.ok(matchEventService.findByMatch(matchId, pageable));
  }

  @GetMapping("/{id}")
  @Operation(summary = "Buscar evento por ID", description = "Retorna um evento específico pelo seu ID")
  public ResponseEntity<MatchEventDTO> findById(@PathVariable Long id) {
    return ResponseEntity.ok(matchEventService.findById(id));
  }

  @PostMapping
  @Operation(summary = "Criar evento", description = "Cria um novo evento de partida")
  public ResponseEntity<MatchEventDTO> create(@RequestBody @Valid MatchEventDTO eventDTO) {
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(matchEventService.create(eventDTO));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Excluir evento", description = "Exclui um evento existente")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    matchEventService.delete(id);
    return ResponseEntity.noContent().build();
  }

}
