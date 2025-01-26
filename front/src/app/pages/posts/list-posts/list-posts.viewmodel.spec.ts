import { ComponentFixture, TestBed } from '@angular/core/testing'

import ListPostsViewModel from './list-posts.viewmodel'

describe('ListPostsViewModel', () => {
  let viewModel: ListPostsViewModel
  let fixture: ComponentFixture<ListPostsViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPostsViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(ListPostsViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
