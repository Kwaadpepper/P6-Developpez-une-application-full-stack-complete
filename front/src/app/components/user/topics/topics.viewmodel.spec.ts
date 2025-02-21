import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { ToastService } from '@core/services'
import { ProfileService } from '@core/services/profile/profile.service'
import TopicsViewModel from './topics.viewmodel'

describe('TopicsViewModel', () => {
  let viewModel: TopicsViewModel
  let profileService: ProfileService
  let toastService: ToastService

  beforeEach(async () => {
    profileService = jasmine.createSpyObj('ProfileService', ['getProfile'])
    toastService = jasmine.createSpyObj('ToastService', ['showError'])

    await TestBed.configureTestingModule({

      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ProfileService,
          useValue: profileService,
        },
        {
          provide: ToastService,
          useValue: toastService,
        }],
    })

    viewModel = TestBed.inject(TopicsViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
