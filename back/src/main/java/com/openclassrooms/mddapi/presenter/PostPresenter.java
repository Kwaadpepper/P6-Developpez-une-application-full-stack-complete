package com.openclassrooms.mddapi.presenter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Post;

@Component
public class PostPresenter implements Presenter<PostDto, Post> {

  @Override
  public PostDto present(final Post model) {
    return PostDto.of(model);
  }

  public PaginatedDto<PostDto> presentModelList(final Page<Post> page, final Integer actualPage) {
    final List<PostDto> list = new ArrayList<>();
    page.iterator().forEachRemaining(item -> {
      list.add(PostDto.of(item));
    });

    return PaginatedDto.of(
        actualPage,
        page.getTotalPages(),
        page.getTotalElements(),
        list);
  }

}
