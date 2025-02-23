import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { SessionService } from '../session/session.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let sessionService: SessionService

  beforeEach(() => {
    sessionService = jasmine.createSpyObj('SessionService', ['setLoggedIn', 'setLoggedOut'])

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SessionService,
          useValue: sessionService,
        }],
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
