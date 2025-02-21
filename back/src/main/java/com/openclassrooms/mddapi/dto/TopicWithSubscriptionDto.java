package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.openclassrooms.mddapi.query_dto.TopicWithSubscription;

public record TopicWithSubscriptionDto(
        UUID uuid,
        String slug,
        String name,
        String description,
        Boolean subscribed,
        ZonedDateTime created_at,
        ZonedDateTime updated_at) {

    public static TopicWithSubscriptionDto of(TopicWithSubscription topic) {
        return new TopicWithSubscriptionDto(
                topic.getUuid(),
                topic.getSlug(),
                topic.getName(),
                topic.getDescription(),
                topic.getSubscribed(),
                topic.getCreatedAt(),
                topic.getUpdatedAt());
    }
}
