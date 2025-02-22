import localeFr from '@angular/common/locales/fr'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DatePipe, registerLocaleData } from '@angular/common'
import { provideRouter } from '@angular/router'
import { Post } from '@core/interfaces'
import { PostCardComponent } from './post-card.component'
import PostCardViewModel from './post-card.viewmodel'

describe('PostCardComponent', () => {
  let component: PostCardComponent
  let fixture: ComponentFixture<PostCardComponent>
  let viewModel: PostCardViewModel
  let post: Post

  beforeEach(async () => {
    registerLocaleData(localeFr)
    post = {
      uuid: '123',
      slug: 'slug',
      title: 'title',
      content: 'content',
      topic_uuid: 'topic_uuid',
      topic_name: 'topic_name',
      author_uuid: 'author_uuid',
      author_name: 'author_name',
      created_at: new Date(),
    }
    viewModel = jasmine.createSpyObj('PostCardViewModel', ['setPost'], {
      post: () => post,
    })

    await TestBed.configureTestingModule({
      imports: [PostCardComponent],
      providers: [
        provideRouter([]),
        DatePipe,
        {
          provide: PostCardViewModel,
          useValue: viewModel,
        }],
    })
      .overrideComponent(PostCardComponent, {
        set: {
          providers: [
            {
              provide: PostCardViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(PostCardComponent)
    fixture.componentInstance.post = post
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
