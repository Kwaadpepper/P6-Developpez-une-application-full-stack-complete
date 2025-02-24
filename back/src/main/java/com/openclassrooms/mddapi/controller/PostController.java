package com.openclassrooms.mddapi.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.exception.exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.model.Credential;
import com.openclassrooms.mddapi.presenter.PostPresenter;
import com.openclassrooms.mddapi.request.post.CreatePostRequest;
import com.openclassrooms.mddapi.service.models.PostService;
import com.openclassrooms.mddapi.valueobject.Slug;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final PostPresenter PostPresenter;

    public PostController(
            final PostService postService,
            final PostPresenter PostPresenter) {
        this.postService = postService;
        this.PostPresenter = PostPresenter;
    }

    /**
     * Fetch a post by its uuid
     *
     * @param slug {@link Slug} The post unique id.
     * @return {@link PostDto}
     * @throws ResourceNotFoundException
     */
    @GetMapping(value = "/{slug}", produces = MediaType.APPLICATION_JSON_VALUE)
    public PostDto get(@PathVariable final Slug slug)
            throws ResourceNotFoundException {

        final var post = postService.getPostBySlug(slug).orElseThrow(
                () -> new ResourceNotFoundException("Post not found for this slug :: " + slug));

        return PostPresenter.present(post);
    }

    /**
     * Create a new post
     *
     * @param authentication {@link Authentication}
     * @param request        {@link CreatePostRequest}
     * @return {@link PostDto} In case of success.
     */
    @Transactional
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public PostDto create(final Authentication authentication,
            @Valid @RequestBody final CreatePostRequest request) {

        final var credential = (Credential) authentication.getPrincipal();
        final var authenticated = credential.getUser();

        final var post = postService.createPost(
                request.getTitle(),
                request.getContent(),
                request.getTopic(),
                authenticated.getUuid());

        return PostPresenter.present(post);
    }

}
