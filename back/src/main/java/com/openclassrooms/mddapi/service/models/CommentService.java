package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(
            final CommentRepository commentRepository,
            final PostRepository postRepository,
            final UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public void createComment(UUID authorUuid, UUID postUuid, String content) {
        var author = userRepository.findById(authorUuid)
                .orElseThrow(() -> new ValidationException("User not found"));
        var post = postRepository.findById(postUuid)
                .orElseThrow(() -> new ValidationException("User not found"));

        var comment = new Comment(content, post, author);
        commentRepository.save(comment);
    }
}
