package com.openclassrooms.mddapi.request.post;

import java.util.UUID;

import org.jsoup.Jsoup;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {
  @NotNull
  @NotEmpty
  @Size(min = 4, max = 255)
  private final String title;

  @NotNull
  @NotEmpty
  @Size(min = 4)
  private final String content;

  @NotNull
  private final UUID topic;

  public CreatePostRequest(String title, String content, UUID topic) {
    this.title = title;
    this.content = content;
    this.topic = topic;
  }

  public String getTitle() {
    return Jsoup.parse(title).text();
  }

  public String getContent() {
    // Don't sanitize content here, it will be done in the service layer
    return content;
  }

  public UUID getTopic() {
    return topic;
  }
}
