import { TestBed } from '@angular/core/testing'

import { CommentsRepository } from '@core/repositories'
import { CommentService } from './comment.service'

describe('CommentService', () => {
  let service: CommentService
  let commentsRepository: CommentsRepository

  beforeEach(() => {
    commentsRepository = jasmine.createSpyObj('CommentsRepository', [
      'getPostsComments',
      'addComment',
    ])

    TestBed.configureTestingModule({
      providers: [{
        provide: CommentsRepository,
        useValue: commentsRepository,
      }],
    })
    service = TestBed.inject(CommentService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
