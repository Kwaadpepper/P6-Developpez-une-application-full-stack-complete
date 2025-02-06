import { ComponentFixture, TestBed } from '@angular/core/testing'

import PostCardViewModel from './post-card.viewmodel'

describe('ShowModel', () => {
  let viewModel: PostCardViewModel
  let fixture: ComponentFixture<PostCardViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCardViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(PostCardViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
