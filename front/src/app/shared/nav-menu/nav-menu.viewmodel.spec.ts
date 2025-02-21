import { ComponentFixture, TestBed } from '@angular/core/testing'

import NavMenuViewModel from './nav-menu.viewmodel'

describe('NavMenuViewModel', () => {
  let viewModel: NavMenuViewModel
  let fixture: ComponentFixture<NavMenuViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(NavMenuViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
