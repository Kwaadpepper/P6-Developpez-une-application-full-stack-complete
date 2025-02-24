import { TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { Comment } from '@core/interfaces'
import { CommentService } from '@core/services'
import ListViewModel from './list.viewmodel'

describe('ListCommentsViewModel', () => {
  let viewModel: ListViewModel
  let commentService: CommentService

  beforeEach(async () => {
    commentService = jasmine.createSpyObj('CommentService', ['paginatePostsComments'], {
      comments: signal<Comment[]>([]),
    })

    await TestBed.configureTestingModule({
      providers: [{
        provide: CommentService,
        useValue: commentService,
      }],
    })

    viewModel = TestBed.inject(ListViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
