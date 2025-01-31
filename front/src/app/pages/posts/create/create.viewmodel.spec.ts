import { ComponentFixture, TestBed } from '@angular/core/testing'

import CreateViewModel from './create.viewmodel'

describe('CreateViewModel', () => {
  let viewModel: CreateViewModel
  let fixture: ComponentFixture<CreateViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(CreateViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
