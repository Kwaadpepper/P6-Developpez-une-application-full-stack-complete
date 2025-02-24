package com.openclassrooms.mddapi.valueobject;

public record Password(String value) {
    public Password {
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("le mot de passe ne peut être vide");
        }
        if (value.length() < 8) {
            throw new IllegalStateException("le mot de passe doit contenir au moins 8 caractères");
        }
        if (!value.matches(containsMixedCase())) {
            throw new IllegalStateException(
                    "le mot de passe doit contenir des majuscules et des minuscules");
        }
        if (!value.matches(containsNumber())) {
            throw new IllegalStateException("le mot de passe doit contenir des nombres");
        }
        if (!value.matches(containsSpecialChar())) {
            throw new IllegalStateException("le mot de passe doit contenir des caractères spéciaux");
        }
    }

    public static Password of(String value) throws IllegalStateException {
        return new Password(value);
    }

    private String containsMixedCase() {
        return "(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!-\\/:-@\\[-`\\{-~]{2,}";
    }

    private String containsNumber() {
        return ".*[0-9]+.*";
    }

    private String containsSpecialChar() {
        return ".*[!-\\/:-@\\[-`\\{-~]+.*";
    }
}
