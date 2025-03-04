import { TestBed } from '@angular/core/testing'

import { TopicService } from '@core/services'
import { ListViewModel } from './list.viewmodel'

describe('ListTopicsViewModel', () => {
  let viewModel: ListViewModel
  let topicService: TopicService

  beforeEach(async () => {
    topicService = jasmine.createSpyObj('TopicService', ['paginateTopics'])

    await TestBed.configureTestingModule({
      providers: [{
        provide: TopicService,
        useValue: topicService,
      }],
    })

    viewModel = TestBed.inject(ListViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
