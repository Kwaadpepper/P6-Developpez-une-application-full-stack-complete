package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.valueobject.Email;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void updateUser(UUID userUuid, String name, Email email) {
        var user = userRepository.findById(userUuid)
                .orElseThrow(() -> new ValidationException("User not found"));
        var emailExists = userRepository.findByEmail(email).isPresent();

        user.setName(name);

        if (!user.getEmail().equals(email) && emailExists) {
            throw new ValidationException("Email is already taken");
        }
        if (!user.getEmail().equals(email)) {
            user.setEmail(email);
        }

        userRepository.save(user);
    }
}
