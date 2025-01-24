package com.openclassrooms.mddapi.valueobject;

import org.apache.commons.validator.routines.EmailValidator;

import jakarta.persistence.Embeddable;

@Embeddable
public record Email(String value) {

    public Email {
        if (!isValidEmail(value)) {
            throw new IllegalStateException("Invalid mail address: '%s'".formatted(value));
        }
    }

    public static Email of(String value) throws IllegalStateException {
        return new Email(value);
    }

    private boolean isValidEmail(String value) {
        return EmailValidator.getInstance().isValid(value);
    }
}
