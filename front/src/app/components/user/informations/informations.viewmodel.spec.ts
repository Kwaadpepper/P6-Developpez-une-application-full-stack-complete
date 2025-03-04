import { TestBed } from '@angular/core/testing'

import { ToastService } from '@core/services'
import { ProfileService } from '@core/services/profile/profile.service'
import { InformationsViewModel } from './informations.viewmodel'

describe('UserInformationsViewModel', () => {
  let viewModel: InformationsViewModel
  let profileService: ProfileService
  let toastService: ToastService

  beforeEach(async () => {
    profileService = jasmine.createSpyObj('ProfileService', ['getProfile'])
    toastService = jasmine.createSpyObj('ToastService', ['showError'])

    await TestBed.configureTestingModule({
      providers: [{
        provide: ProfileService,
        useValue: profileService,
      },
      {
        provide: ToastService,
        useValue: toastService,
      }],
    })

    viewModel = TestBed.inject(InformationsViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
