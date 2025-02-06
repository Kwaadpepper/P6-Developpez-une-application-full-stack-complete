import { ComponentFixture, TestBed } from '@angular/core/testing'

import InformationsViewModel from './informations.viewmodel'

describe('InformationsViewModel', () => {
  let viewModel: InformationsViewModel
  let fixture: ComponentFixture<InformationsViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(InformationsViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
