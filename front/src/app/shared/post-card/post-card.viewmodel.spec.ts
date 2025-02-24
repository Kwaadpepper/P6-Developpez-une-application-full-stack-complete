import { TestBed } from '@angular/core/testing'

import { MarkdownService } from 'ngx-markdown'
import PostCardViewModel from './post-card.viewmodel'

describe('PostCardViewModel', () => {
  let viewModel: PostCardViewModel
  let markdownService: MarkdownService

  beforeEach(async () => {
    markdownService = jasmine.createSpyObj('MarkdownService', ['parse'])

    await TestBed.configureTestingModule({
      providers: [{
        provide: MarkdownService,
        useValue: markdownService,
      }],
    })

    viewModel = TestBed.inject(PostCardViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
