package com.openclassrooms.mddapi.request.topic;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

//@formatter:off
public record SubscriptionTopicRequest(
    @NotNull
    UUID topic
) {
}
