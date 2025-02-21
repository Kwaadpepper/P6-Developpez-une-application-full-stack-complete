import { TestBed } from '@angular/core/testing'

import HomeViewModel from './home.viewmodel'

describe('HomeViewModel', () => {
  let viewModel: HomeViewModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })

    viewModel = TestBed.inject(HomeViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
