import { ComponentFixture, TestBed } from '@angular/core/testing'

import HeaderViewModel from './header.viewmodel'

describe('HeaderModel', () => {
  let viewModel: HeaderViewModel
  let fixture: ComponentFixture<HeaderViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(HeaderViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
