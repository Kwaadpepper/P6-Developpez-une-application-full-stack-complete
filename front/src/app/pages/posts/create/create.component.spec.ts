import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { provideRouter } from '@angular/router'
import { TopicName } from '@core/interfaces'
import { ToastService } from '@core/services'
import { MarkdownEditorComponent } from '@shared/index'
import { CreateComponent } from './create.component'
import CreateViewModel from './create.viewmodel'

describe('CreatePostComponent', () => {
  let component: CreateComponent
  let fixture: ComponentFixture<CreateComponent>
  let viewModel: CreateViewModel
  let toastService: ToastService

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('CreateViewModel', [
      'setTopicNameByUUID', 'getTopicNamesPage',
    ], {
      loading: signal(false),
      formErrorMessage: signal(''),
      topicNames: signal<TopicName[]>([]),
      topicsTotalItems: signal(0),
      topicsAreLoading: signal(false),
      content: signal(''),
      errors: {
        title: signal(''),
        content: signal(''),
        topicName: signal(''),
      },
    })
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
      .overrideComponent(CreateComponent, {
        set: {
          providers: [
            {
              provide: CreateViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .overrideComponent(MarkdownEditorComponent, {
        set: {
          selector: 'app-markdown-editor',
          template: `<span>app-markdown-editor</span>`,
        },
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
