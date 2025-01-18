package com.openclassrooms.mddapi.controller;

import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.dto.TopicNameDto;
import com.openclassrooms.mddapi.presenter.TopicPresenter;
import com.openclassrooms.mddapi.service.models.TopicService;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final TopicService topicService;
    private final TopicPresenter topicPresenter;

    TopicController(
            final TopicService topicService,
            final TopicPresenter topicPresenter) {
        this.topicService = topicService;
        this.topicPresenter = topicPresenter;
    }

    /**
     * This may be used to fetch and search paginated topics names
     *
     * @param page {@link Integer} The page number
     * @return {@link PaginatedDto} of {@link TopicDto}
     */
    @GetMapping(path = "names", produces = MediaType.APPLICATION_JSON_VALUE)
    public PaginatedDto<TopicNameDto> paginatedTopicTitles(
            @RequestParam(required = false) @Nullable @org.springframework.lang.Nullable final String name,
            @RequestParam(required = false, defaultValue = "1") @Min(value = 1) final Integer page) {
        var pageRequest = PageRequest.of(page - 1, 30);

        final var topicList = Optional.ofNullable(name)
                .map(nameLike -> topicService.getPaginatedTopicsNamesWhere(pageRequest, nameLike))
                .orElseGet(() -> topicService.getPaginatedTopicsNames(pageRequest));

        return topicPresenter.presentModelNameList(topicList, page);
    }

    /**
     * This may be used to fetch paginated topics
     *
     * @param page {@link Integer} The page number
     * @return {@link PaginatedDto} of {@link TopicDto}
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PaginatedDto<TopicDto> paginatedTopics(
            @RequestParam(required = false, defaultValue = "1") @Min(value = 1) final Integer page) {
        var pageRequest = PageRequest.of(page - 1, 30);

        final var topicList = topicService.getPaginatedTopics(pageRequest);

        return topicPresenter.presentModelList(topicList, page);
    }
}
