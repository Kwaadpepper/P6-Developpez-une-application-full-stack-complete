package com.openclassrooms.mddapi.service.models;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException.ValidationError;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.ContentCleanerService;
import com.openclassrooms.mddapi.service.SluggerService;
import com.openclassrooms.mddapi.valueobject.Slug;

@Service
public class PostService {
  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final TopicRepository topicRepository;
  private final ContentCleanerService contentCleanerService;
  private final SluggerService sluggerService;

  public PostService(
      final PostRepository postRepository,
      final UserRepository userRepository,
      final TopicRepository topicRepository,
      final ContentCleanerService contentCleanerService,
      final SluggerService sluggerService) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.topicRepository = topicRepository;
    this.contentCleanerService = contentCleanerService;
    this.sluggerService = sluggerService;
  }

  public Optional<Post> getPost(final UUID uuid) {
    return postRepository.findById(uuid);
  }

  public Optional<Post> getPostBySlug(final Slug slug) {
    return postRepository.findBySlug(slug);
  }

  public Post createPost(
      final String title,
      final String content,
      final UUID topicUuid,
      final UUID authorUuid) {

    var topic = topicRepository.findById(topicUuid)
        .orElseThrow(() -> ValidationException.of(ValidationError.of("topic", "Topic not found")));
    var author = userRepository.findById(authorUuid)
        .orElseThrow(() -> ValidationException.of(ValidationError.of("author", "User not found")));
    var sanitizedContent = contentCleanerService.sanitizeMarkdown(content);
    var slug = generateSlug(title);

    if (postRepository.existsBySlug(slug)) {
      throw ValidationException.of(ValidationError.of("title", "Post with this title already exists"));
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
        .orElseThrow(() -> ValidationException.of(ValidationError.of("post", "Post not found")));
    var topic = topicRepository.findById(topicUuid)
        .orElseThrow(() -> ValidationException.of(ValidationError.of("topic", "Topic not found")));
    var sanitizedContent = contentCleanerService.stripHtml(content);
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

  private Slug generateSlug(final String title) {
    try {
      return sluggerService.slugify(title);
    } catch (IllegalArgumentException e) {
      throw ValidationException.of(ValidationError.of("title", "Cannot generate slug from title"));
    }
  }

}
