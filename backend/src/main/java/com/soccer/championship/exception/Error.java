package com.soccer.championship.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum Error {

  TIME_NAO_ENCONTRADO("Time não encontrado", HttpStatus.NOT_FOUND);

  private final String message;
  private final HttpStatus status;
}
