package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException.ValidationError;
import com.openclassrooms.mddapi.repository.CredentialRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.PasswordService;
import com.openclassrooms.mddapi.valueobject.Email;
import com.openclassrooms.mddapi.valueobject.Password;
import com.openclassrooms.mddapi.valueobject.PasswordHash;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final CredentialRepository credentialRepository;
    private final PasswordService passwordService;

    public UserService(
            UserRepository userRepository,
            CredentialRepository credentialRepository,
            PasswordService passwordService) {
        this.userRepository = userRepository;
        this.credentialRepository = credentialRepository;
        this.passwordService = passwordService;
    }

    @Transactional
    public void updateUser(UUID userUuid, String name, Email email, @Nullable Password password) {
        final var credential = credentialRepository.findByUserUuid(userUuid)
                .orElseThrow(() -> ValidationException.of(ValidationError.of("user", "Utilisateur non trouvé")));
        final var usernameExists = userRepository.findByName(name)
                .filter(user -> !user.getUuid().equals(userUuid)).isPresent();
        final var emailExists = userRepository.findByEmail(email)
                .filter(user -> !user.getUuid().equals(userUuid)).isPresent();
        final var user = credential.getUser();
        final PasswordHash newPassword;

        if (usernameExists) {
            throw ValidationException.of(ValidationError.of("usernameExists", "Le nom d'utilisateur est déjà utilisé"));
        }
        if (emailExists) {
            throw ValidationException.of(ValidationError.of("email", "L'adresse e-mail est déjà utilisée"));
        }
        if (!user.getName().equals(name)) {
            user.setName(name);
        }
        if (!user.getEmail().equals(email)) {
            user.setEmail(email);
        }

        userRepository.save(user);

        if (password != null) {
            newPassword = passwordService.hash(password);
            credential.setPassword(newPassword);
            credentialRepository.save(credential);
        }
    }
}
