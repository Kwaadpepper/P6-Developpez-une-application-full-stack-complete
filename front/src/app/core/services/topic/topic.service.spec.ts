import { TestBed } from '@angular/core/testing'

import { TopicRepository } from '@core/repositories'
import { TopicService } from './topic.service'

describe('TopicService', () => {
  let service: TopicService
  let topicRepository: TopicRepository

  beforeEach(() => {
    topicRepository = jasmine.createSpyObj('TopicRepository', [
      'getTopics',
      'getTopicNames',
      'getUserSubscribedTopics',
      'unsubscribeFrom',
    ])

    TestBed.configureTestingModule({
      providers: [{
        provide: TopicRepository,
        useValue: topicRepository,
      }],
    })
    service = TestBed.inject(TopicService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
