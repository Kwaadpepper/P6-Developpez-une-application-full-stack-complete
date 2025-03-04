import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { of } from 'rxjs'

import { ToastService } from '@core/services'
import { LogoutButtonComponent } from './logout-button.component'
import { LogoutButtonViewModel } from './logout-button.viewmodel'

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent
  let fixture: ComponentFixture<LogoutButtonComponent>
  let viewModel: LogoutButtonViewModel
  let toastService: ToastService

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('LogoutButtonViewModel', {}, {
      logout: of(),
    })
    toastService = jasmine.createSpyObj('ToastService', ['info', 'error'])

    await TestBed.configureTestingModule({
      imports: [LogoutButtonComponent],
      providers: [
        provideRouter([]),
        { provide: LogoutButtonViewModel, useValue: viewModel },
        { provide: ToastService, useValue: toastService },
      ],
    })
      .overrideComponent(LogoutButtonComponent, {
        set: {
          providers: [
            { provide: LogoutButtonViewModel, useValue: viewModel },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(LogoutButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
