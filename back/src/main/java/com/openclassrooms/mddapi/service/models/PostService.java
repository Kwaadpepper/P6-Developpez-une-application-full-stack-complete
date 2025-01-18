package com.openclassrooms.mddapi.service.models;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.HtmlCleanerService;
import com.openclassrooms.mddapi.service.SluggerService;

@Service
public class PostService {
  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final TopicRepository topicRepository;
  private final HtmlCleanerService htmlCleanerService;
  private final SluggerService sluggerService;

  public PostService(
      final PostRepository postRepository,
      final UserRepository userRepository,
      final TopicRepository topicRepository,
      final HtmlCleanerService htmlCleanerService,
      final SluggerService sluggerService) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.topicRepository = topicRepository;
    this.htmlCleanerService = htmlCleanerService;
    this.sluggerService = sluggerService;
  }

  public Optional<Post> getPost(final UUID uuid) {
    return postRepository.findById(uuid);
  }

  public Post createPost(
      final String title,
      final String content,
      final UUID topicUuid,
      final UUID authorUuid) {

    var topic = topicRepository.findById(topicUuid)
        .orElseThrow(() -> new ValidationException("Topic not found"));
    var author = userRepository.findById(authorUuid)
        .orElseThrow(() -> new ValidationException("User not found"));
    var sanitizedContent = htmlCleanerService.stripHtml(content);
    var slug = generateSlug(title);

    if (postRepository.existsBySlug(slug)) {
      throw new ValidationException("Post with this title already exists");
    }

    var post = new Post(slug, title, sanitizedContent, topic, author);

    return postRepository.save(post);
  }

  public Post updatePost(
      final UUID postUuid,
      final String title,
      final String content,
      final UUID topicUuid) {

    var post = postRepository.findById(postUuid)
        .orElseThrow(() -> new ValidationException("Post not found"));
    var topic = topicRepository.findById(topicUuid)
        .orElseThrow(() -> new ValidationException("Topic not found"));
    var sanitizedContent = htmlCleanerService.stripHtml(content);
    var slug = generateSlug(title);

    post.setTitle(title);
    post.setSlug(slug);
    post.setContent(sanitizedContent);
    post.setTopic(topic);

    return postRepository.save(post);
  }

  public void deletePost(final UUID uuid) {
    postRepository.deleteById(uuid);
  }

  private String generateSlug(final String title) {
    try {
      return sluggerService.slugify(title);
    } catch (IllegalArgumentException e) {
      throw new ValidationException("Cannot generate slug from title");
    }
  }

}
