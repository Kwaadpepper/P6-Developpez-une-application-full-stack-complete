import { TestBed } from '@angular/core/testing'

import { PostService, TopicService } from '@core/services'
import { CreateViewModel } from './create.viewmodel'

describe('CreatePostViewModel', () => {
  let viewModel: CreateViewModel
  let postService: PostService
  let topicService: TopicService

  beforeEach(async () => {
    postService = jasmine.createSpyObj('PostService', ['createPost'])
    topicService = jasmine.createSpyObj('TopicService', ['getTopics'])

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: PostService,
          useValue: postService,
        },
        {
          provide: TopicService,
          useValue: topicService,
        },
      ],
    })

    viewModel = TestBed.inject(CreateViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
