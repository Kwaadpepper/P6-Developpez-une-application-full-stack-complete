import { TestBed } from '@angular/core/testing'

import { Router } from '@angular/router'
import { AuthService, SessionService, ToastService } from '@core/services'
import { SessionInterceptor } from './session.interceptor'

describe('SessionInterceptor', () => {
  let rooter: Router
  let authService: AuthService
  let sessionService: SessionService
  let toastService: ToastService

  beforeEach(() => {
    rooter = jasmine.createSpyObj('Router', ['navigate'])
    authService = jasmine.createSpyObj('AuthService', ['logout'])
    sessionService = jasmine.createSpyObj('SessionService', ['isAuthenticated'])
    toastService = jasmine.createSpyObj('ToastService', ['showError'])

    TestBed.configureTestingModule({
      providers: [
        SessionInterceptor,
        {
          provide: Router,
          useValue: rooter,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: SessionService,
          useValue: sessionService,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    })
  })

  it('should be created', () => {
    const interceptor: SessionInterceptor = TestBed.inject(SessionInterceptor)
    expect(interceptor).toBeTruthy()
  })
})
