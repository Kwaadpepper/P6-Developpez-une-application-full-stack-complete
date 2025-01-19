package com.openclassrooms.mddapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.dto.SimpleMessage;
import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.dto.TopicNameDto;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.presenter.TopicPresenter;
import com.openclassrooms.mddapi.request.topic.SubscriptionTopicRequest;
import com.openclassrooms.mddapi.service.auth.SessionService;
import com.openclassrooms.mddapi.service.models.SubscriptionService;
import com.openclassrooms.mddapi.service.models.TopicService;

import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final SessionService sessionService;
    private final TopicService topicService;
    private final SubscriptionService subscriptionService;
    private final TopicPresenter topicPresenter;

    TopicController(
            final SessionService sessionService,
            final TopicService topicService,
            final SubscriptionService subscriptionService,
            final TopicPresenter topicPresenter) {
        this.sessionService = sessionService;
        this.topicService = topicService;
        this.subscriptionService = subscriptionService;
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

        return topicPresenter.presentModelPage(topicList, page);
    }

    /**
     * This may be used to fetch the topics that the current user is subscribed to
     *
     * @return {@link List} of {@link TopicDto}
     */
    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TopicDto> getCurrentUserSubscribedTopic() {
        final var authUser = sessionService.getAuthenticatedUser();
        final var subscriptions = subscriptionService.getUserSubscriptions(authUser);
        final List<Topic> topicList = new ArrayList<>();
        subscriptions.forEach((subscription) -> {
            final var topic = subscription.getTopic();
            topicList.add(topic);
        });

        return topicPresenter.presentModelList(topicList);
    }

    /**
     * This may be used to subscribe the current user to a topic
     *
     * @param request {@link SubscriptionTopicRequest}
     * @return {@link SimpleMessage} In case of success.
     */
    @Transactional
    @PostMapping(value = "/subscription", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleMessage subscribeOnTopic(@RequestBody @Valid SubscriptionTopicRequest request) {
        final var authUser = sessionService.getAuthenticatedUser();

        subscriptionService.subscribeUserOnTopic(
                authUser.getUuid(),
                request.topic());

        return new SimpleMessage("Subscribed to topic!");
    }

    /**
     * This may be used to unsubscribe the current user from a topic
     *
     * @param request {@link SubscriptionTopicRequest}
     * @return {@link SimpleMessage} In case of success.
     */
    @Transactional
    @DeleteMapping(value = "/subscription", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleMessage unsubscribeOnTopic(@RequestBody @Valid SubscriptionTopicRequest request) {
        final var authUser = sessionService.getAuthenticatedUser();

        subscriptionService.unSubscribeUserOnTopic(
                authUser.getUuid(),
                request.topic());

        return new SimpleMessage("Unsubscribed from topic!");
    }
}
