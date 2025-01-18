package com.openclassrooms.mddapi.presenter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.PostListDto;
import com.openclassrooms.mddapi.model.Post;

@Component
public class PostPresenter implements Presenter<PostDto, Post> {

  @Override
  public PostDto present(final Post model) {
    return new PostDto(
        model.getUuid(),
        model.getSlug(),
        model.getTitle(),
        model.getContent(),
        model.getTopic().getUuid(),
        model.getAuthor().getUuid(),
        model.getAuthor().getName(),
        model.getCreatedAt(),
        model.getUpdatedAt());
  }

  public PostListDto presentModelList(final Iterable<Post> rentals) {
    final List<Post> output = new ArrayList<>();
    rentals.iterator().forEachRemaining(output::add);

    return new PostListDto(output.stream()
        .map(model -> new PostListDto.PostDto(
            model.getUuid(),
            model.getSlug(),
            model.getTitle(),
            model.getContent(),
            model.getTopic().getUuid(),
            model.getAuthor().getUuid(),
            model.getAuthor().getName(),
            model.getCreatedAt(),
            model.getUpdatedAt()))
        .toList());
  }

}
