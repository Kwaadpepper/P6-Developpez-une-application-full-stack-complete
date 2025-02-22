import { TestBed } from '@angular/core/testing'

import ScrollTopViewModel from './scroll-top.viewmodel'

describe('ScrollTopViewModel', () => {
  let viewModel: ScrollTopViewModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })

    viewModel = TestBed.inject(ScrollTopViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
