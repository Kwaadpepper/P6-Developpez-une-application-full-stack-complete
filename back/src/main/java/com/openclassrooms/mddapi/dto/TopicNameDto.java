package com.openclassrooms.mddapi.dto;

import java.util.UUID;

import com.openclassrooms.mddapi.service.models.TopicService.TopicName;

public record TopicNameDto(
        UUID uuid,
        String name) {

    public static TopicNameDto of(TopicName topic) {
        return new TopicNameDto(
                topic.uuid(),
                topic.name());
    }
}
