package com.myproject.my_application.exception;

import org.springframework.http.HttpStatus;

public class EmployeeException extends RuntimeException {
    private final HttpStatus status;

    public EmployeeException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
