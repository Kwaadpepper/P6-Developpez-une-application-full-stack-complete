import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { Topic } from '@core/interfaces'
import { ToastService } from '@core/services'
import { TopicCardComponent } from './topic-card.component'
import TopicCardViewModel from './topic-card.viewmodel'

describe('TopicCardComponent', () => {
  let component: TopicCardComponent
  let fixture: ComponentFixture<TopicCardComponent>
  let toastService: ToastService
  let viewModel: TopicCardViewModel

  beforeEach(async () => {
    toastService = jasmine.createSpyObj('ToastService', ['show'])
    viewModel = jasmine.createSpyObj('TopicCardViewModel', [
      'setTopic',
    ], {
      topic: signal<Topic>({
        uuid: '123',
        slug: '123',
        name: '123',
        description: '123',
        created_at: new Date(),
      }),
      canSubscribe: signal(true),
      strippedTopicContent: signal(''),
    })

    await TestBed.configureTestingModule({
      imports: [TopicCardComponent],
      providers: [
        {
          provide: ToastService,
          useValue: toastService,
        },
        {
          provide: TopicCardViewModel,
          useValue: viewModel,
        },
      ],
    })
      .overrideComponent(TopicCardComponent, {
        set: {
          providers: [
            {
              provide: TopicCardViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(TopicCardComponent)
    fixture.componentRef.setInput('topicCardElement', {
      uuid: '123',
      slug: '123',
      name: '123',
      description: '123',
      created_at: new Date(),
    })
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
