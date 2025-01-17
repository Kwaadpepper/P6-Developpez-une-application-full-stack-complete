package com.openclassrooms.mddapi.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Topic;

@Repository
public interface TopicRepository extends CrudRepository<Topic, UUID> {

}
