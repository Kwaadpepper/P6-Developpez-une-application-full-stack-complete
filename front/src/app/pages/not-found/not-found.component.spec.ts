import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { NotFoundComponent } from './not-found.component'
import NotFoundViewModel from './not-found.viewmodel'

describe('NotFoundComponent', () => {
  let component: NotFoundComponent
  let fixture: ComponentFixture<NotFoundComponent>
  let viewModel: NotFoundViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('NotFoundViewModel', {}, {
      appName: signal(''),
    })
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
    })
      .overrideComponent(NotFoundComponent, {
        set: {
          providers: [
            {
              provide: NotFoundViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(NotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
