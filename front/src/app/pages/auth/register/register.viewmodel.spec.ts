import { TestBed } from '@angular/core/testing'

import { AuthService, ToastService } from '@core/services'
import { RegisterViewModel } from './register.viewmodel'

describe('RegisterViewModel', () => {
  let viewModel: RegisterViewModel
  let authService: AuthService
  let toastService: ToastService

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['register'])
    toastService = jasmine.createSpyObj('ToastService', ['success'])

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    })

    viewModel = TestBed.inject(RegisterViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
