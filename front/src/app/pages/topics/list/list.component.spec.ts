import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { signal } from '@angular/core'
import { Topic } from '@core/interfaces'
import { ListComponent } from './list.component'
import ListViewModel from './list.viewmodel'

describe('ListTopicsComponent', () => {
  let component: ListComponent
  let fixture: ComponentFixture<ListComponent>
  let viewModel: ListViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('ListTopicsViewModel', {
      reloadTopics: of(),
    }, {
      loading: signal(false),
      topics: signal<Topic[]>([]),
    })

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [{
        provide: ListViewModel,
        useValue: viewModel,
      }],
    })
      .overrideComponent(ListComponent, {
        set: {
          providers: [{
            provide: ListViewModel,
            useValue: viewModel,
          }],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
