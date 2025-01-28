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
    CREATED("1", "Criado"),
    IN_PROGRESS("2", "Em andamento"),
    FINISHED("3", "Finalizado");

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
