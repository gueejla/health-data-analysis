package com.health_data_analysis.backend.exception;

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String msg) { super(msg); }
}
