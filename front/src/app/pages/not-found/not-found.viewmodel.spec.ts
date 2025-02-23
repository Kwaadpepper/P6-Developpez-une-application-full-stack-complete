import { TestBed } from '@angular/core/testing'

import NotFoundViewModel from './not-found.viewmodel'

describe('NotFoundViewModel', () => {
  let viewModel: NotFoundViewModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })

    viewModel = TestBed.inject(NotFoundViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
