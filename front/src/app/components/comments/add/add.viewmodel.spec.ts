import { ComponentFixture, TestBed } from '@angular/core/testing'

import AddViewModel from './add.viewmodel'

describe('AddViewModel', () => {
  let viewModel: AddViewModel
  let fixture: ComponentFixture<AddViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(AddViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
