import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { provideRouter } from '@angular/router'
import { ToastService } from '@core/services'
import { LoginComponent } from './login.component'
import { LoginViewModel } from './login.viewmodel'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let viewModel: LoginViewModel
  let toastService: ToastService

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('LoginViewModel', {}, {
      formErrorMessage: signal(''),
      loading: signal(false),
    })
    toastService = jasmine.createSpyObj('ToastService', ['error'])

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: LoginViewModel,
          useValue: viewModel,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    })
      .overrideComponent(LoginComponent, {
        set: {
          providers: [
            {
              provide: LoginViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
