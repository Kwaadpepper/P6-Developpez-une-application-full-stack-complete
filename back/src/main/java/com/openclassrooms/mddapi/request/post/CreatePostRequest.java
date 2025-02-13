package com.openclassrooms.mddapi.request.post;

import java.util.UUID;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document.OutputSettings;
import org.jsoup.safety.Safelist;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {
  private final String title;
  private final String content;
  private final UUID topic;

  public CreatePostRequest(
      @NotNull @NotEmpty @Size(min = 4, max = 255) String title,
      @NotNull @NotEmpty @Size(min = 4, max = 255) String content,
      @NotNull UUID topic) {
    this.title = title;
    this.content = content;
    this.topic = topic;
  }

  public String getTitle() {
    return Jsoup.parse(title).text();
  }

  public String getContent() {
    return Jsoup.clean(content, "", Safelist.relaxed(), (new OutputSettings()).prettyPrint(false));
  }

  public UUID getTopic() {
    return topic;
  }
}
