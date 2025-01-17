package com.openclassrooms.mddapi.service.models;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(final UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void deleteUser(final UUID uuid) {
    userRepository.deleteById(uuid);
  }

  public Optional<User> getUser(final UUID uuid) {
    return userRepository.findById(uuid);
  }

  public Optional<User> getUserFromEmail(final String email) {
    return userRepository.findByEmail(email);
  }

  public Iterable<User> getUsers() {
    return userRepository.findAll();
  }

  public User saveUser(final User user) {
    return userRepository.save(user);
  }

}
