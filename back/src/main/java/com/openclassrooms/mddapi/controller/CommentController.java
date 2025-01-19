package com.openclassrooms.mddapi.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.SimpleMessage;
import com.openclassrooms.mddapi.request.comment.CreateCommentRequest;
import com.openclassrooms.mddapi.service.auth.SessionService;
import com.openclassrooms.mddapi.service.models.CommentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    private final SessionService sessionService;

    public CommentController(
            final CommentService commentService,
            final SessionService sessionService) {
        this.commentService = commentService;
        this.sessionService = sessionService;
    }

    /**
     * Create a new comment
     *
     * @param request {@link CreateCommentRequest}
     * @return {@link SimpleMessage} In case of success.
     */
    @PostMapping(value = "", consumes = "application/json", produces = "application/json")
    public SimpleMessage createComment(@Valid @RequestBody final CreateCommentRequest request) {

        var authUser = sessionService.getAuthenticatedUser();

        commentService.createComment(
                authUser.getUuid(),
                request.post(),
                request.content());

        return new SimpleMessage("Comment created!");
    }

}
