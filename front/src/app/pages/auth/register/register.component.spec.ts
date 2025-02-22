import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { ToastService } from '@core/services'
import { RegisterComponent } from './register.component'
import RegisterViewModel from './register.viewmodel'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let viewModel: RegisterViewModel
  let toastService: ToastService

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('RegisterViewModel', {}, {
      loading: signal(false),
      formErrorMessage: signal(''),
      errors: {
        email: signal(''),
        username: signal(''),
        password: signal(''),
      },
    })
    toastService = jasmine.createSpyObj('ToastService', ['showError'])

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: RegisterViewModel,
          useValue: viewModel,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    })
      .overrideComponent(RegisterComponent, {
        set: {
          providers: [
            {
              provide: RegisterViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
