package com.soccer.championship.domain.enums;

import com.soccer.championship.domain.dto.EnumDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@AllArgsConstructor
public enum PlayerPosition {

  GOALKEEPER("1", "Goleiro"),

  DEFENDER("2", "Zagueiro"),

  FULLBACK("3", "Lateral"),

  LEFT_BACK("4", "Lateral esquerdo"),

  RIGHT_BACK("5", "Lateral direito"),

  MIDFIELDER("6", "Meia"),

  LEFT_MIDFIELDER("7", "Meia esquerda"),

  RIGHT_MIDFIELDER("8", "Meia direita"),

  DEFENSIVE_MIDFIELDER("9", "Volante"),

  ATTACKING_MIDFIELDER("10", "Meia atacante"),

  PLAYMAKER("11", "Armador"),

  CENTER_FORWARD("12", "Centroavante"),

  STRIKER("13", "Atacante"),

  WINGER("14", "Ponta");

  private final String codigo;
  private final String descricao;

  public static List<EnumDto> obterTodos() {
    List<EnumDto> dto = new ArrayList<>();

    Arrays.stream(PlayerPosition.values()).forEach(status ->
      dto.add(
        new EnumDto(
          Integer.parseInt(status.getCodigo()),
          status.getDescricao()
        )
      )
    );
    return dto;
  }

  public static PlayerPosition getByCodigo(String codigo) {
    for (PlayerPosition status : PlayerPosition.values()) {
      if (status.getCodigo().equals(codigo)) {
        return status;
      }
    }
    return null;
  }
}
