package com.soccer.championship.exception;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final Error error;

    String message;

    public AppException(Error error) {
        super(error.getMessage());
        this.error = error;
    }

    public AppException(Error error, String message) {
        super(error.getMessage());
        this.error = error;
        this.message = message;
    }
}
