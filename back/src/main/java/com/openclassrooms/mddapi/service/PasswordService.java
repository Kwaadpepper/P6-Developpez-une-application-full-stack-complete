package com.openclassrooms.mddapi.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.valueobject.Password;
import com.openclassrooms.mddapi.valueobject.PasswordHash;

@Service
public class PasswordService {
    private final PasswordEncoder passwordEncoder;

    public PasswordService(final PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public PasswordHash hash(final Password password) {
        final var passwordValue = password.value();

        return PasswordHash.of(passwordEncoder.encode(passwordValue));
    }
}
