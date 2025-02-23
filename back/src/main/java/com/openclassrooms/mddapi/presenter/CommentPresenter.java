package com.openclassrooms.mddapi.presenter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.query_dto.CommentWithAuthor;

@Component
public class CommentPresenter implements Presenter<CommentDto, CommentWithAuthor> {

  @Override
  public CommentDto present(final CommentWithAuthor comment) {
    return CommentDto.of(comment);
  }

  public CommentDto present(final Comment comment, final User author) {
    return CommentDto.of(comment, author);
  }

  public PaginatedDto<CommentDto> presentModelPage(final Page<CommentWithAuthor> page, final Integer actualPage) {
    final List<CommentDto> list = new ArrayList<>();
    page.iterator().forEachRemaining(comment -> {
      list.add(CommentDto.of(comment));
    });

    return PaginatedDto.of(
        actualPage,
        page.getTotalPages(),
        page.getTotalElements(),
        list);
  }

}
