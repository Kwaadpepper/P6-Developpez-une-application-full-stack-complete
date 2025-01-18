package com.openclassrooms.mddapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;

@Service
public class FeedService {
  private final PostRepository postRepository;

  public FeedService(final PostRepository PostRepository) {
    this.postRepository = PostRepository;
  }

  /**
   * Fetch the user feed
   *
   * @param user {@link User} The user to fetch the feed for.
   * @param page {@link PageRequest} The page request, page size cannot
   *             exceed 50.
   * @return {@link Page} of {@link Post}
   */
  public Page<Post> getUserFeed(User user, PageRequest page) {
    if (page.getPageSize() > 50) {
      throw new IllegalArgumentException("Page size must be less than or equal to 50");
    }
    return postRepository.findAllByAuthorUuid(user.getUuid(), page);
  }

}
