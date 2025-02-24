import { TestBed } from '@angular/core/testing'

import { FeedService, TopicService } from '@core/services'
import { MarkdownService } from 'ngx-markdown'
import TopicCardViewModel from './topic-card.viewmodel'

describe('PostCardViewModel', () => {
  let viewModel: TopicCardViewModel
  let feedService: FeedService
  let topicService: TopicService
  let markdownService: MarkdownService

  beforeEach(async () => {
    feedService = jasmine.createSpyObj('FeedService', ['getFeed'])
    topicService = jasmine.createSpyObj('TopicService', ['getTopic'])
    markdownService = jasmine.createSpyObj('MarkdownService', ['parse'])

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: FeedService,
          useValue: feedService,
        },
        {
          provide: TopicService,
          useValue: topicService,
        },
        {
          provide: MarkdownService,
          useValue: markdownService,
        }],
    })

    viewModel = TestBed.inject(TopicCardViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
