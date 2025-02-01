package com.soccer.championship.domain.enums;

import com.soccer.championship.domain.dto.EnumDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@AllArgsConstructor
public enum ChampionshipStatus {
  DRAFT("1", "Rascunho"),

  REGISTRATION("2", "Em cadastro"),

  IN_PROGRESS("3", "Em andamento"),

  FINISHED("4", "Finalizado"),

  CANCELLED("5", "Cancelado");

  private final String codigo;
  private final String descricao;

  public static List<EnumDto> obterTodos() {
    List<EnumDto> dto = new ArrayList<>();

    Arrays.stream(ChampionshipStatus.values()).forEach(status ->
      dto.add(
        new EnumDto(
          Integer.parseInt(status.getCodigo()),
          status.getDescricao()
        )
      )
    );
    return dto;
  }

  public static ChampionshipStatus getByCodigo(String codigo) {
    for (ChampionshipStatus status : ChampionshipStatus.values()) {
      if (status.getCodigo().equals(codigo)) {
        return status;
      }
    }
    return null;
  }
}
