import { TestBed } from '@angular/core/testing'

import { PostRepository } from '@core/repositories'
import { PostService } from './post.service'

describe('PostService', () => {
  let service: PostService
  let postRepository: PostRepository

  beforeEach(() => {
    postRepository = jasmine.createSpyObj('PostRepository', [
      'createPost',
      'findPostBySlug',
    ])

    TestBed.configureTestingModule({
      providers: [{
        provide: PostRepository,
        useValue: postRepository,
      }],
    })
    service = TestBed.inject(PostService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
