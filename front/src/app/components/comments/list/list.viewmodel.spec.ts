import { TestBed } from '@angular/core/testing'

import { CommentService } from '@core/services'
import ListViewModel from './list.viewmodel'

describe('ListViewModel', () => {
  let viewModel: ListViewModel
  let commentService: CommentService

  beforeEach(async () => {
    commentService = jasmine.createSpyObj('CommentService', ['paginatePostsComments'])

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
