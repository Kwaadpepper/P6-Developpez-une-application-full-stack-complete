import { ComponentFixture, TestBed } from '@angular/core/testing'

import HomeViewModel from './home.viewmodel'

describe('HomeViewModel', () => {
  let viewModel: HomeViewModel
  let fixture: ComponentFixture<HomeViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(HomeViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
