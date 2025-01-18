package com.openclassrooms.mddapi.controller;

import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.exception.exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.presenter.PostPresenter;
import com.openclassrooms.mddapi.service.models.PostService;

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
     * @param uuid {@link UUID} The post unique id.
     * @return {@link PostDto}
     * @throws ResourceNotFoundException
     */
    @GetMapping(value = "/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostDto> getRentalById(@PathVariable final UUID uuid)
            throws ResourceNotFoundException {

        final var rental = postService.getPost(uuid).orElseThrow(
                () -> new ResourceNotFoundException("Post not found for this uuid :: " + uuid));

        return ResponseEntity.ok().body(PostPresenter.present(rental));
    }

}
