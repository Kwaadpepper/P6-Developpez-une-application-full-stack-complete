package com.openclassrooms.mddapi.presenter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.PaginatedDto;
import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.dto.TopicNameDto;
import com.openclassrooms.mddapi.dto.TopicWithSubscriptionDto;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.query_dto.TopicWithSubscription;
import com.openclassrooms.mddapi.service.models.TopicService.TopicName;

@Component
public class TopicPresenter implements Presenter<TopicDto, Topic> {

  @Override
  public TopicDto present(final Topic model) {
    return TopicDto.of(model);
  }

  public List<TopicDto> presentModelList(final List<Topic> list) {
    return list.stream().map(TopicDto::of).toList();
  }

  public PaginatedDto<TopicDto> presentModelPage(final Page<Topic> page, final Integer actualPage) {
    final List<TopicDto> list = new ArrayList<>();
    page.iterator().forEachRemaining(item -> {
      list.add(TopicDto.of(item));
    });

    return PaginatedDto.of(
        actualPage,
        page.getTotalPages(),
        page.getTotalElements(),
        list);
  }

  public PaginatedDto<TopicWithSubscriptionDto> presentModelWithSubscriptionPage(
      final Page<TopicWithSubscription> page,
      final Integer actualPage) {
    final List<TopicWithSubscriptionDto> list = new ArrayList<>();
    page.iterator().forEachRemaining(item -> {
      list.add(TopicWithSubscriptionDto.of(item));
    });

    return PaginatedDto.of(
        actualPage,
        page.getTotalPages(),
        page.getTotalElements(),
        list);
  }

  public PaginatedDto<TopicNameDto> presentModelNameList(final Page<TopicName> page, final Integer actualPage) {
    final List<TopicNameDto> list = new ArrayList<>();
    page.iterator().forEachRemaining(item -> {
      list.add(TopicNameDto.of(item));
    });

    return PaginatedDto.of(
        actualPage,
        page.getTotalPages(),
        page.getTotalElements(),
        list);
  }

}
