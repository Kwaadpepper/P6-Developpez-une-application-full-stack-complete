package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.openclassrooms.mddapi.model.Topic;

public record TopicDto(
        UUID uuid,
        String slug,
        String name,
        String description,
        ZonedDateTime created_at,
        ZonedDateTime updated_at) {

    public static TopicDto of(Topic topic) {
        return new TopicDto(
                topic.getUuid(),
                topic.getSlug(),
                topic.getName(),
                topic.getDescription(),
                topic.getCreatedAt(),
                topic.getUpdatedAt());
    }
}
