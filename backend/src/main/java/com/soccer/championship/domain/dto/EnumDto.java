package com.soccer.championship.domain.dto;

import lombok.Data;

@Data
public class EnumDto {

  private Integer codigo;
  private String descricao;

  public EnumDto(Integer codigo, String descricao) {
    this.codigo = codigo;
    this.descricao = descricao;
  }

}
