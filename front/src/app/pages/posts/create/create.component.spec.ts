import { ComponentFixture, TestBed } from '@angular/core/testing'

import { provideRouter } from '@angular/router'
import { ToastService } from '@core/services'
import { CreateComponent } from './create.component'
import CreateViewModel from './create.viewmodel'

describe('CreateComponent', () => {
  let component: CreateComponent
  let fixture: ComponentFixture<CreateComponent>
  let viewModel: CreateViewModel
  let toastService: ToastService

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('CreateViewModel', ['setTopicNameByUUID'], ['title', 'content'])
    toastService = jasmine.createSpyObj('ToastService', ['showSuccess'])

    await TestBed.configureTestingModule({
      imports: [CreateComponent],
      providers: [
        provideRouter([]),
        {
          provide: CreateViewModel,
          useValue: viewModel,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    })
      .compileComponents()

    fixture = TestBed.createComponent(CreateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
