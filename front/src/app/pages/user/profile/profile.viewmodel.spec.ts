import { TestBed } from '@angular/core/testing'

import { ProfileViewModel } from './profile.viewmodel'

describe('ProfileViewModel', () => {
  let viewModel: ProfileViewModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })

    viewModel = TestBed.inject(ProfileViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
