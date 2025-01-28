package com.soccer.championship.domain.enums;

import com.soccer.championship.domain.dto.EnumDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@AllArgsConstructor
public enum MatchStatus {

    SCHEDULED("1", "Agendado"),
    IN_PROGRESS("2", "Em andamento"),
    FINISHED("3", "Finalizado"),
    CANCELLED("4", "Cancelado"),
    POSTPONED("5", "Adiado");


  private final String codigo;
  private final String descricao;

  public static List<EnumDto> obterTodos() {
    List<EnumDto> dto = new ArrayList<>();

    Arrays.stream(MatchStatus.values()).forEach(status ->
      dto.add(
        new EnumDto(
          Integer.parseInt(status.getCodigo()),
          status.getDescricao()
        )
      )
    );
      return dto;
    }

    public static MatchStatus getByCodigo(String codigo) {
      for (MatchStatus status : MatchStatus.values()) {
        if (status.getCodigo().equals(codigo)) {
          return status;
        }
      }
      return null;
    }
  }

