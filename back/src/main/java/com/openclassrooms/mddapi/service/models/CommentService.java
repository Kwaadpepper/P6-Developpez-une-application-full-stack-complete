package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException.ValidationError;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.query_dto.CommentWithAuthor;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.repository.comments.CommentCommandRepository;
import com.openclassrooms.mddapi.repository.comments.CommentQueryRepository;
import com.openclassrooms.mddapi.service.ContentCleanerService;

@Service
public class CommentService {
    private final CommentQueryRepository commentReadRepository;
    private final CommentCommandRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ContentCleanerService contentCleanerService;

    public CommentService(
            final CommentQueryRepository commentReadRepository,
            final CommentCommandRepository commentRepository,
            final PostRepository postRepository,
            final UserRepository userRepository,
            final ContentCleanerService contentCleanerService) {
        this.commentReadRepository = commentReadRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.contentCleanerService = contentCleanerService;
    }

    /**
     * Get comments for a post
     *
     * @param post The post to get comments for
     * @param page The page to get
     * @return A page of comments
     */
    public Page<CommentWithAuthor> getPostComments(UUID postUuid, PageRequest page) {
        if (page.getPageSize() > 50) {
            throw new IllegalArgumentException("Page size must be less than or equal to 50");
        }

        if (!postRepository.existsById(postUuid)) {
            throw ValidationException.of(ValidationError.of("post", "Post not found"));
        }

        return commentReadRepository.findAllByPostUuid(postUuid, page);
    }

    /**
     * Create a comment
     *
     * @param authorUuid The author of the comment
     * @param postUuid   The post to comment
     * @param content    The content of the comment
     */
    public void createComment(UUID authorUuid, UUID postUuid, String content) {
        var author = userRepository.findById(authorUuid)
                .orElseThrow(() -> ValidationException.of(ValidationError.of("author", "User not found")));
        var post = postRepository.findById(postUuid)
                .orElseThrow(() -> ValidationException.of(ValidationError.of("post", "Post not found")));
        var sanitizedContent = contentCleanerService.sanitizeMarkdown(content);

        var comment = new Comment(sanitizedContent, post, author);
        commentRepository.save(comment);
    }
}
