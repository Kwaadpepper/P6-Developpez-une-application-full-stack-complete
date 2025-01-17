package com.openclassrooms.mddapi.service.models;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;

@Service
public class PostService {
  private final PostRepository PostRepository;

  public PostService(final PostRepository PostRepository) {
    this.PostRepository = PostRepository;
  }

  public void deletePost(final UUID uuid) {
    PostRepository.deleteById(uuid);
  }

  public Optional<Post> getPost(final UUID uuid) {
    return PostRepository.findById(uuid);
  }

  public Iterable<Post> getPosts() {
    return PostRepository.findAll();
  }

  public Post savePost(final Post Post) {
    return PostRepository.save(Post);
  }

}
