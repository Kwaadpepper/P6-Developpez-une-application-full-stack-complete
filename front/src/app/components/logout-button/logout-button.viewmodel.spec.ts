import { TestBed } from '@angular/core/testing'

import { AuthService } from '@core/services'
import { LogoutButtonViewModel } from './logout-button.viewmodel'

describe('LogoutButtonViewModel', () => {
  let viewModel: LogoutButtonViewModel
  let authService: AuthService

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout'])

    await TestBed.configureTestingModule({
      providers: [{
        provide: AuthService,
        useValue: authService,
      }],
    })

    viewModel = TestBed.inject(LogoutButtonViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
