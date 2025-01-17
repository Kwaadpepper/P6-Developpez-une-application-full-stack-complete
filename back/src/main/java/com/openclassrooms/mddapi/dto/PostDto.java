package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

//@formatter:off
public record PostDto(
    UUID uuid,
    String slug,
    String title,
    String content,
    UUID topic_uuid,
    UUID author_uuid,
    ZonedDateTime created_at,
    ZonedDateTime updated_at) {
}
