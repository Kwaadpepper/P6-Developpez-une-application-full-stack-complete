package com.openclassrooms.mddapi.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.presenter.PostPresenter;
import com.openclassrooms.mddapi.service.FeedService;
import com.openclassrooms.mddapi.service.auth.AuthenticationService;

import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/feed")
public class FeedController {
    private final AuthenticationService authenticationService;
    private final FeedService feedService;
    private final PostPresenter PostPresenter;

    public FeedController(
            final AuthenticationService authenticationService,
            final FeedService feedService,
            final PostPresenter PostPresenter) {
        this.authenticationService = authenticationService;
        this.feedService = feedService;
        this.PostPresenter = PostPresenter;
    }

    /**
     * This may be used to fetch paginated user post feed
     *
     * @param page The page number to fetch, starts at 0.
     * @return A list of posts.
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PaginatedDto<PostDto> getUserFeed(
            @RequestParam(required = false, defaultValue = "1") @Min(value = 1) final Integer page) {
        final var user = authenticationService.getAuthenticatedUser()
                .orElseThrow(IllegalStateException::new);
        final var postList = feedService.getUserFeed(user, PageRequest.of(page - 1, 30));

        return PostPresenter.presentModelList(postList, page);
    }

}
