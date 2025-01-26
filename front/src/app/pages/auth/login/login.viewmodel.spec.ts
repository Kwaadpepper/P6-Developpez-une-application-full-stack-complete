import { ComponentFixture, TestBed } from '@angular/core/testing'

import LoginViewModel from './login.viewmodel'

describe('LoginViewModel', () => {
  let viewModel: LoginViewModel
  let fixture: ComponentFixture<LoginViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(LoginViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
