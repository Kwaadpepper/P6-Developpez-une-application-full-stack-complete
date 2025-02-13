package com.openclassrooms.mddapi.request.post;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {
  private final String title;
  private final String content;
  private final UUID author;

  public CreatePostRequest(
      @NotNull @NotEmpty @Size(min = 4, max = 255) String title,
      @NotNull @NotEmpty @Size(min = 4, max = 255) String content,
      @NotNull UUID author) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public String getTitle() {
    return title;
  }

  public String getContent() {
    return content;
  }

  public UUID getAuthor() {
    return author;
  }
}
