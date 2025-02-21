import { ComponentFixture, TestBed } from '@angular/core/testing'

import TopicsViewModel from './topics.viewmodel'

describe('TopicsViewModel', () => {
  let viewModel: TopicsViewModel
  let fixture: ComponentFixture<TopicsViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicsViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(TopicsViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
