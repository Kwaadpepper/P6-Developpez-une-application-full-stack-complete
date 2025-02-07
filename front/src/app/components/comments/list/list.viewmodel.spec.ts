import { ComponentFixture, TestBed } from '@angular/core/testing'

import ListViewModel from './list.viewmodel'

describe('ListViewModel', () => {
  let viewModel: ListViewModel
  let fixture: ComponentFixture<ListViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(ListViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
