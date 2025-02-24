import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { Topic } from '@core/interfaces'
import { of } from 'rxjs'
import { TopicsComponent } from './topics.component'
import TopicsViewModel from './topics.viewmodel'

describe('UserTopicsComponent', () => {
  let component: TopicsComponent
  let fixture: ComponentFixture<TopicsComponent>
  let viewModel: TopicsViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('TopicsViewModel', {
      reloadUserTopics: of(),
    }, {
      loading: signal(false),
      userTopics: signal<Topic[]>([]),
    })

    await TestBed.configureTestingModule({
      imports: [TopicsComponent],
      providers: [{
        provide: TopicsViewModel,
        useValue: viewModel,
      }],
    })
      .overrideComponent(TopicsComponent, {
        set: {
          providers: [{
            provide: TopicsViewModel,
            useValue: viewModel,
          }],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(TopicsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
