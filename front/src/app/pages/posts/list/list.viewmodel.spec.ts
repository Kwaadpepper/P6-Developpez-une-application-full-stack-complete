import { TestBed } from '@angular/core/testing'

import { FeedService } from '@core/services'
import ListViewModel from './list.viewmodel'

describe('ListPostsViewModel', () => {
  let viewModel: ListViewModel
  let feedService: FeedService

  beforeEach(async () => {
    feedService = jasmine.createSpyObj('FeedService', ['paginatePosts'])

    await TestBed.configureTestingModule({
      providers: [{
        provide: FeedService,
        useValue: feedService,
      }],
    })

    viewModel = TestBed.inject(ListViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
