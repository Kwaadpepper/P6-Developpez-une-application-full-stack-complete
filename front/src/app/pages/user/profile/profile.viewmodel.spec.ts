import { ComponentFixture, TestBed } from '@angular/core/testing'

import ProfileViewModel from './profile.viewmodel'

describe('ProfileViewModel', () => {
  let viewModel: ProfileViewModel
  let fixture: ComponentFixture<ProfileViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(ProfileViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
