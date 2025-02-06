import { ComponentFixture, TestBed } from '@angular/core/testing'

import TopicCardViewModel from './topic-card.viewmodel'

describe('ShowModel', () => {
  let viewModel: TopicCardViewModel
  let fixture: ComponentFixture<TopicCardViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCardViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(TopicCardViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
