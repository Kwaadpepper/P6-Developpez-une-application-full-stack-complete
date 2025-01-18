package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.openclassrooms.mddapi.model.User;

public record UserDto(
        UUID uuid,
        String name,
        String email,
        ZonedDateTime created_at,
        ZonedDateTime updated_at) {

    public static UserDto of(User user) {
        return new UserDto(
                user.getUuid(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }
}
