import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { ToastService } from '@core/services'
import { of } from 'rxjs'
import { InformationsComponent } from './informations.component'
import { InformationsViewModel } from './informations.viewmodel'

describe('UserInformationsComponent', () => {
  let component: InformationsComponent
  let fixture: ComponentFixture<InformationsComponent>
  let toastService: ToastService
  let viewModel: InformationsViewModel

  beforeEach(async () => {
    toastService = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError'])
    viewModel = jasmine.createSpyObj('InformationsViewModel', {
      refreshUserInformation: of(),
    }, {
      formErrorMessage: signal(''),
      loading: signal(false),
      informations: signal([]),

      hasRefreshedData: of(),

      email: signal(''),
      username: signal(''),
      password: signal(''),
      errors: {
        email: signal(''),
        username: signal(''),
        password: signal(''),
      },
    })

    await TestBed.configureTestingModule({
      imports: [InformationsComponent],
      providers: [
        {
          provide: ToastService,
          useValue: toastService,
        },
        {
          provide: InformationsViewModel,
          useValue: viewModel,
        },
      ],
    })
      .overrideComponent(InformationsComponent, {
        set: {
          providers: [
            {
              provide: InformationsViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(InformationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
