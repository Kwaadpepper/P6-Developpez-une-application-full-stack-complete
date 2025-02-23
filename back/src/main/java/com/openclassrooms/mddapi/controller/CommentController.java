package com.openclassrooms.mddapi.controller;

import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.dto.SimpleMessage;
import com.openclassrooms.mddapi.exception.exceptions.JwtAuthenticationFailureException;
import com.openclassrooms.mddapi.presenter.CommentPresenter;
import com.openclassrooms.mddapi.request.comment.CreateCommentRequest;
import com.openclassrooms.mddapi.service.auth.SessionService;
import com.openclassrooms.mddapi.service.models.CommentService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api")
public class CommentController {
    private final CommentService commentService;
    private final SessionService sessionService;
    private final CommentPresenter commentPresenter;

    public CommentController(
            final CommentService commentService,
            final SessionService sessionService,
            final CommentPresenter commentPresenter) {
        this.commentService = commentService;
        this.sessionService = sessionService;
        this.commentPresenter = commentPresenter;
    }

    /**
     * Fetch comments for a post
     *
     * @param page     {@link Integer} The page number
     * @param perPage  {@link Integer} The number of items per page
     * @param postUuid {@link UUID} The post unique id.
     * @return {@link PaginatedDto} of {@link CommentDto}
     */
    @GetMapping(value = "/posts/{postUuid}/comments", produces = MediaType.APPLICATION_JSON_VALUE)
    public PaginatedDto<CommentDto> getCommentsForPost(
            @RequestParam(required = false, defaultValue = "1") @Min(value = 1) final Integer page,
            @RequestParam(required = false, defaultValue = "30", name = "per-page") @Min(value = 1) @Max(value = 30) final Integer perPage,
            @PathVariable final UUID postUuid) {

        var pageRequest = PageRequest.of(page - 1, perPage);

        final var commentReadPage = commentService.getPostComments(postUuid, pageRequest);

        return commentPresenter.presentModelPage(commentReadPage, page);
    }

    /**
     * Create a new comment
     *
     * @param request {@link CreateCommentRequest}
     * @return {@link SimpleMessage} In case of success.
     */
    @Transactional
    @PostMapping(value = "/comments", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public CommentDto createComment(@Valid @RequestBody final CreateCommentRequest request) {

        var authUser = sessionService.getAuthenticatedUser().or(() -> {
            throw new JwtAuthenticationFailureException("No user is authenticated.");
        }).get();

        var comment = commentService.createComment(
                authUser.getUuid(),
                request.getPost(),
                request.getContent());

        return commentPresenter.present(comment, authUser);
    }

}
