package com.openclassrooms.mddapi.presenter;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.model.User;

@Component
public class UserPresenter implements Presenter<UserDto, User> {

  @Override
  public UserDto present(final User model) {
    return new UserDto(
        model.getUuid(),
        model.getName(),
        model.getEmail().value(),
        model.getCreatedAt(),
        model.getUpdatedAt());
  }
}
