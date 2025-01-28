package com.soccer.championship.domain.enums;

import com.soccer.championship.domain.dto.EnumDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@AllArgsConstructor
public enum MatchEventType {
    GOAL("1", "Gol"),

    OWN_GOAL("2", "Gol contra"),

    YELLOW_CARD("3", "Cartão amarelo"),

    RED_CARD("4", "Cartão vermelho"),

    SUBSTITUTION("5", "Substituição"),

    PENALTY_MISSED("6", "Pênalti perdido"),

    PENALTY_SCORED("7", "Pênalti convertido");

  private final String codigo;
  private final String descricao;

  public static List<EnumDto> obterTodos() {
    List<EnumDto> dto = new ArrayList<>();

    Arrays.stream(MatchEventType.values()).forEach(status ->
      dto.add(
        new EnumDto(
          Integer.parseInt(status.getCodigo()),
          status.getDescricao()
        )
      )
    );
    return dto;
  }

  public static MatchEventType getByCodigo(String codigo) {
    for (MatchEventType status : MatchEventType.values()) {
      if (status.getCodigo().equals(codigo)) {
        return status;
      }
    }
    return null;
  }
}
