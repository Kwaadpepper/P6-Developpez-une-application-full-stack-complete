import { TestBed } from '@angular/core/testing'

import { UserRepository } from '@core/repositories'
import { ProfileService } from './profile.service'

describe('ProfileService', () => {
  let service: ProfileService
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = jasmine.createSpyObj('UserRepository', [])

    TestBed.configureTestingModule({
      providers: [{
        provide: UserRepository,
        useValue: userRepository,
      }],
    })
    service = TestBed.inject(ProfileService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
