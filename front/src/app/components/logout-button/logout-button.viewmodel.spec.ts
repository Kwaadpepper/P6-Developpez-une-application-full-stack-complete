import { ComponentFixture, TestBed } from '@angular/core/testing'

import LogoutButtonViewModel from './logout-button.viewmodel'

describe('LogoutButtonViewModel', () => {
  let viewModel: LogoutButtonViewModel
  let fixture: ComponentFixture<LogoutButtonViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutButtonViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(LogoutButtonViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
