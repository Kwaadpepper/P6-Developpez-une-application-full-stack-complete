import { ComponentFixture, TestBed } from '@angular/core/testing'

import RegisterViewModel from './register.viewmodel'

describe('RegisterViewModel', () => {
  let viewModel: RegisterViewModel
  let fixture: ComponentFixture<RegisterViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(RegisterViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
