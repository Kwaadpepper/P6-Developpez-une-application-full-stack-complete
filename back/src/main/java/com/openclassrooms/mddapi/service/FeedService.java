package com.openclassrooms.mddapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;

@Service
public class FeedService {
  private final PostRepository PostRepository;

  public FeedService(final PostRepository PostRepository) {
    this.PostRepository = PostRepository;
  }

  /**
   * Fetch the user feed
   *
   * @param page {@link PageRequest} The page request, page size cannot exceed 50.
   * @param user {@link User} The user to fetch the feed for.
   * @return {@link Page} of {@link Post}
   */
  public Page<Post> getUserFeed(User user, PageRequest page) {
    if (page.getPageSize() > 50) {
      throw new IllegalArgumentException("Page size must be less than or equal to 50");
    }
    return PostRepository.findAllByAuthorUuid(user.getUuid(), page);
  }

}
