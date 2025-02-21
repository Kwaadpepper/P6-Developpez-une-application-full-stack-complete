import { ComponentFixture, TestBed } from '@angular/core/testing'

import ShowViewModel from './show.viewmodel'

describe('ShowModel', () => {
  let viewModel: ShowViewModel
  let fixture: ComponentFixture<ShowViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(ShowViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
