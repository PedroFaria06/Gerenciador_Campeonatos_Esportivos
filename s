[1mdiff --git a/backend/src/main/java/com/soccer/championship/config/CorsConfiguration.java b/backend/src/main/java/com/soccer/championship/config/CorsConfiguration.java[m
[1mnew file mode 100644[m
[1mindex 0000000..e34db67[m
[1m--- /dev/null[m
[1m+++ b/backend/src/main/java/com/soccer/championship/config/CorsConfiguration.java[m
[36m@@ -0,0 +1,17 @@[m
[32m+[m[32mpackage com.soccer.championship.config;[m
[32m+[m
[32m+[m[32mimport org.springframework.context.annotation.Configuration;[m
[32m+[m[32mimport org.springframework.web.servlet.config.annotation.CorsRegistry;[m
[32m+[m[32mimport org.springframework.web.servlet.config.annotation.WebMvcConfigurer;[m
[32m+[m
[32m+[m[32m@Configuration[m
[32m+[m[32mpublic class CorsConfiguration implements WebMvcConfigurer {[m
[32m+[m
[32m+[m[32m  @Override[m
[32m+[m[32m  public void addCorsMappings(CorsRegistry registry) {[m
[32m+[m[32m    registry.addMapping("/**")[m
[32m+[m[32m      .allowedOrigins("http://localhost")[m
[32m+[m[32m      .allowedMethods("*");[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m}[m
[1mdiff --git a/backend/src/main/java/com/soccer/championship/controller/ChampionshipController.java b/backend/src/main/java/com/soccer/championship/controller/ChampionshipController.java[m
[1mindex cbd0b1d..08d670e 100644[m
[1m--- a/backend/src/main/java/com/soccer/championship/controller/ChampionshipController.java[m
[1m+++ b/backend/src/main/java/com/soccer/championship/controller/ChampionshipController.java[m
[36m@@ -1,9 +1,21 @@[m
 package com.soccer.championship.controller;[m
 [m
[32m+[m[32mimport com.soccer.championship.domain.ChampionshipStatus;[m
[32m+[m[32mimport com.soccer.championship.domain.dto.ChampionshipDTO;[m
[32m+[m[32mimport com.soccer.championship.domain.dto.ChampionshipTeamDTO;[m
[32m+[m[32mimport com.soccer.championship.domain.dto.ChampionshipTeamsDTO;[m
[32m+[m[32mimport com.soccer.championship.service.ChampionshipService;[m
[32m+[m[32mimport io.swagger.v3.oas.annotations.Operation;[m
 import io.swagger.v3.oas.annotations.tags.Tag;[m
[32m+[m[32mimport jakarta.validation.Valid;[m
 import lombok.RequiredArgsConstructor;[m
[31m-import org.springframework.web.bind.annotation.RequestMapping;[m
[31m-import org.springframework.web.bind.annotation.RestController;[m
[32m+[m[32mimport org.springframework.data.domain.Page;[m
[32m+[m[32mimport org.springframework.data.domain.Pageable;[m
[32m+[m[32mimport org.springframework.http.HttpStatus;[m
[32m+[m[32mimport org.springframework.http.ResponseEntity;[m
[32m+[m[32mimport org.springframework.web.bind.annotation.*;[m
[32m+[m
[32m+[m[32mimport java.util.List;[m
 [m
 @RestController[m
 @RequestMapping("/api/v1/championships")[m
[36m@@ -11,4 +23,63 @@[m [mimport org.springframework.web.bind.annotation.RestController;[m
 @Tag(name = "Campeonatos", description = "API para gerenciamento de campeonatos")[m
 public class ChampionshipController {[m
 [m
[32m+[m[32m  private final ChampionshipService championshipService;[m
[32m+[m
[32m+[m[32m  @GetMapping[m
[32m+[m[32m  @Operation(summary = "Listar todos os campeonatos", description = "Retorna uma lista paginada de campeonatos")[m
[32m+[m[32m  public ResponseEntity<Page<ChampionshipDTO>> findAll(Pageable pageable) {[m
[32m+[m[32m    return ResponseEntity.ok(championshipService.findAll(pageable));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @GetMapping("/status/{status}")[m
[32m+[m[32m  @Operation(summary = "Listar campeonatos por status", description = "Retorna uma lista paginada de campeonatos com um status específico")[m
[32m+[m[32m  public ResponseEntity<Page<ChampionshipDTO>> findByStatus([m
[32m+[m[32m    @PathVariable ChampionshipStatus status,[m
[32m+[m[32m    Pageable pageable) {[m
[32m+[m[32m    return ResponseEntity.ok(championshipService.findByStatus(status, pageable));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @GetMapping("/{id}")[m
[32m+[m[32m  @Operation(summary = "Buscar campeonato por ID", description = "Retorna um campeonato específico pelo seu ID")[m
[32m+[m[32m  public ResponseEntity<ChampionshipDTO> findById(@PathVariable Long id) {[m
[32m+[m[32m    return ResponseEntity.ok(championshipService.findById(id));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @GetMapping("/{id}/standings")[m
[32m+[m[32m  @Operation(summary = "Obter classificação", description = "Retorna a classificação atual do campeonato")[m
[32m+[m[32m  public ResponseEntity<List<ChampionshipTeamDTO>> getStandings(@PathVariable Long id) {[m
[32m+[m[32m    return ResponseEntity.ok(championshipService.getStandings(id));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @PostMapping[m
[32m+[m[32m  @Operation(summary = "Criar campeonato", description = "Cria um novo campeonato")[m
[32m+[m[32m  public ResponseEntity<ChampionshipDTO> create(@RequestBody @Valid ChampionshipDTO championshipDTO) {[m
[32m+[m[32m    return ResponseEntity.status(HttpStatus.CREATED)[m
[32m+[m[32m      .body(championshipService.create(championshipDTO));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @PutMapping("/{id}")[m
[32m+[m[32m  @Operation(summary = "Atualizar campeonato", description = "Atualiza um campeonato existente")[m
[32m+[m[32m  public ResponseEntity<ChampionshipDTO> update([m
[32m+[m[32m    @PathVariable Long id,[m
[32m+[m[32m    @RequestBody @Valid ChampionshipDTO championshipDTO) {[m
[32m+[m[32m    return ResponseEntity.ok(championshipService.update(id, championshipDTO));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @DeleteMapping("/{id}")[m
[32m+[m[32m  @Operation(summary = "Excluir campeonato", description = "Exclui um campeonato existente")[m
[32m+[m[32m  public ResponseEntity<Void> delete(@PathVariable Long id) {[m
[32m+[m[32m    championshipService.delete(id);[m
[32m+[m[32m    return ResponseEntity.noContent().build();[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  @PostMapping("/{id}/teams")[m
[32m+[m[32m  @Operation(summary = "Adicionar times ao campeonato", description = "Adiciona uma lista de times ao campeonato")[m
[32m+[m[32m  public ResponseEntity<Void> addTeams([m
[32m+[m[32m    @PathVariable("id") Long championshipId,[m
[32m+[m[32m    @RequestBody @Valid ChampionshipTeamsDTO teamsDTO) {[m
[32m+[m[32m    championshipService.addTeams(championshipId, teamsDTO.teamIds());[m
[32m+[m[32m    return ResponseEntity.ok().build();[m
[32m+[m[32m  }[m
[32m+[m
 }[m
[1mdiff --git a/backend/src/main/java/com/soccer/championship/controller/MatchController.java b/backend/src/main/java/com/soccer/championship/controller/MatchController.java[m
[1mindex 0fd9220..e8b7496 100644[m
[1m--- a/backend/src/main/java/com/soccer/championship/controller/MatchController.java[m
[1m+++ b/backend/src/main/java/com/soccer/championship/controller/MatchController.java[m
[36m@@ -1,13 +1,65 @@[m
 package com.soccer.championship.controller;[m
 [m
[32m+[m[32mimport com.soccer.championship.domain.dto.MatchDTO;[m
[32m+[m[32mimport com.soccer.championship.domain.dto.UpdateMatchDTO;[m
[32m+[m[32mimport com.soccer.championship.service.MatchService;[m
[32m+[m[32mimport io.swagger.v3.oas.annotations.Operation;[m
 import io.swagger.v3.oas.annotations.tags.Tag;[m
[32m+[m[32mimport jakarta.validation.Valid;[m
 import lombok.RequiredArgsConstructor;[m
[31m-import org.springframework.web.bind.annotation.RequestMapping;[m
[31m-import org.springframework.web.bind.annotation.RestController;[m
[32m+[m[32mimport org.springframework.data.domain.Page;[m
[32m+[m[32mimport org.springframework.data.domain.Pageable;[m
[32m+[m[32mimport org.springframework.http.HttpStatus;[m
[32m+[m[32mimport org.springframework.http.ResponseEntity;[m
[32m+[m[32mimport org.springframework.web.bind.annotation.*;[m
 [m
 @RestController[m
 @RequestMapping("/api/v1/matches")[m
 @RequiredArgsConstructor[m
 @Tag(name = "Partidas", description = "API para gerenciamento de partidas")[m
 public class MatchController {[m
