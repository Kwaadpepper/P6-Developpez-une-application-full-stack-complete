import { TestBed } from '@angular/core/testing'

import { CommentService } from '@core/services'
import AddViewModel from './add.viewmodel'

describe('AddViewModel', () => {
  let viewModel: AddViewModel
  let commentService: CommentService

  beforeEach(async () => {
    commentService = jasmine.createSpyObj('CommentService', ['addComment'])

    await TestBed.configureTestingModule({
      providers: [{
        provide: CommentService,
        useValue: commentService,
      }],
    })

    viewModel = TestBed.inject(AddViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
