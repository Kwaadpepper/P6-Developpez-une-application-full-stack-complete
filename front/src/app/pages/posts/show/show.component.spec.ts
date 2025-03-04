import { DatePipe, registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { Component, EventEmitter, input, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CommentAddComponent, CommentsListComponent } from '@components/index'
import { Post } from '@core/interfaces'
import { MarkdownComponent } from 'ngx-markdown'
import { ShowComponent } from './show.component'
import { ShowViewModel } from './show.viewmodel'

@Component({
  selector: 'app-list-comments',
  template: `<span>app-list-comments</span>`,
  providers: [
    {
      provide: CommentsListComponent,
      useClass: MockCommentsListComponent,
    },
  ],
})
class MockCommentsListComponent {
  postUuid = input<string>('')
  reloadComments = input<EventEmitter<void>>()
}

@Component({
  selector: 'app-add-comment',
  template: `<span>app-add-comment</span>`,
  providers: [
    {
      provide: CommentAddComponent,
      useClass: MockCommentAddComponent,
    },
  ],
})
class MockCommentAddComponent {
  forPost = input<string>('')
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'markdown',
  template: `<span>markdown</span>`,
  providers: [
    {
      provide: MarkdownComponent,
      useClass: MockMarkdownComponent,
    },
  ],
})
class MockMarkdownComponent {
  data = input<string>('')
}

describe('ShowPostComponent', () => {
  let component: ShowComponent
  let fixture: ComponentFixture<ShowComponent>
  let viewModel: ShowViewModel

  beforeEach(async () => {
    registerLocaleData(localeFr)
    viewModel = jasmine.createSpyObj('ShowPostViewModel', {}, {
      post: signal<Post>({
        uuid: '123',
        slug: '123',
        title: '123',
        content: '123',
        topic_uuid: '123',
        topic_name: '123',
        author_uuid: '123',
        author_name: '123',
        created_at: new Date(),
      }),
    })

    await TestBed.configureTestingModule({
      imports: [ShowComponent],
      providers: [
        DatePipe,
        {
          provide: ShowViewModel,
          useValue: viewModel,
        },
      ],
    })
      .overrideComponent(ShowComponent, {
        remove: {
          imports: [
            CommentsListComponent,
            CommentAddComponent,
            MarkdownComponent,
          ],
          providers: [ShowViewModel],
        },
        add: {
          imports: [
            MockCommentsListComponent,
            MockCommentAddComponent,
            MockMarkdownComponent,
          ],
          providers: [
            {
              provide: ShowViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ShowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
