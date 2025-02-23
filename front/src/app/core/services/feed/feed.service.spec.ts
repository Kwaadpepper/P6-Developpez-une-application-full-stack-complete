import { TestBed } from '@angular/core/testing'

import { PostRepository } from '@core/repositories'
import { FeedService } from './feed.service'

describe('FeedService', () => {
  let service: FeedService
  let postRepository: PostRepository

  beforeEach(() => {
    postRepository = jasmine.createSpyObj('PostRepository', [
      'getCurrentUserFeed',
    ])

    TestBed.configureTestingModule({
      providers: [{
        provide: PostRepository,
        useValue: postRepository,
      }],
    })
    service = TestBed.inject(FeedService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
