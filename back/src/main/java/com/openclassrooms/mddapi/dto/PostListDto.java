package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

//@formatter:off
public record PostListDto(
    List<PostDto> posts
) {
  public record PostDto(
    UUID uuid,
    String slug,
    String title,
    String content,
    UUID topic_uuid,
    UUID author_uuid,
    String author_name,
    ZonedDateTime created_at,
    ZonedDateTime updated_at) {
    }
}
