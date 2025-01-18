package com.openclassrooms.mddapi.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
     * @param page      {@link Integer} The page number
     * @param ascending {@link Boolean} Whether to sort the feed in ascending
     *                  order using updated at column.
     * @return
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PaginatedDto<PostDto> getUserFeed(
            @RequestParam(required = false, defaultValue = "1") @Min(value = 1) final Integer page,
            @RequestParam(required = false, defaultValue = "false") final Boolean ascending) {
        final var user = authenticationService.getAuthenticatedUser()
                .orElseThrow(IllegalStateException::new);
        var sortDirection = ascending ? Direction.ASC : Direction.DESC;
        var sort = Sort.by(sortDirection, "updatedAt");
        var pageRequest = PageRequest.of(page - 1, 30, sort);

        final var postList = feedService.getUserFeed(user, pageRequest);

        return PostPresenter.presentModelList(postList, page);
    }

}
