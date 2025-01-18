package com.openclassrooms.mddapi.request.post;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//@formatter:off
public record CreatePostRequest (

  @NotNull
  @NotEmpty
  @Size(min = 3, max = 255)
  String title,

  @NotNull
  @NotEmpty
  @Size(min = 4)
  String content,

  @NotNull
  UUID topic


) {
}
