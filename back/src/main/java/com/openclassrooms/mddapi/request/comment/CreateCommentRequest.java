package com.openclassrooms.mddapi.request.comment;

import java.util.UUID;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document.OutputSettings;
import org.jsoup.safety.Safelist;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateCommentRequest {
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 255)
    private final String content;
    @NotNull
    private final UUID post;

    public CreateCommentRequest(
            String content,
            UUID post) {
        this.post = post;
        this.content = content;
    }

    public String getContent() {
        return Jsoup.clean(content, "", Safelist.basic(), (new OutputSettings()).prettyPrint(false));
    }

    public UUID getPost() {
        return post;
    }
}