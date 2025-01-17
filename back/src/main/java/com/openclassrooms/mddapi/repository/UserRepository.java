package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
    /**
     * Retrieves an entity by its email.
     *
     * @param email must not be {@literal null} or blank.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal email} is {@literal null}.
     */
    Optional<User> findByEmail(String email);
}
