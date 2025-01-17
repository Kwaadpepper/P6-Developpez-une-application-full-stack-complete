package com.openclassrooms.mddapi.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PostListDto;
import com.openclassrooms.mddapi.presenter.PostPresenter;
import com.openclassrooms.mddapi.service.models.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService PostService;
    private final PostPresenter PostPresenter;

    public PostController(
            final PostService PostService,
            final PostPresenter PostPresenter) {
        this.PostService = PostService;
        this.PostPresenter = PostPresenter;
    }

    /**
     * This is used to fetch posts
     *
     * @return A list of posts.
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PostListDto getAllPosts() {
        return PostPresenter.presentModelList(PostService.getPosts());
    }

}
