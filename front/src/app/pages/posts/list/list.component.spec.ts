import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { provideRouter } from '@angular/router'
import { Post } from '@core/interfaces'
import { PostCardComponent } from '@shared/index'
import { ListComponent } from './list.component'
import ListViewModel from './list.viewmodel'

describe('ListPostsComponent', () => {
  let component: ListComponent
  let fixture: ComponentFixture<ListComponent>
  let viewModel: ListViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('ListPostsViewModel', [
      'feedUserWithMorePosts',
      'reloadPosts',
    ], {
      sortAscending: signal(false),
      loading: signal(false),
      posts: signal<Post[]>([]),
    })

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        provideRouter([]),
        {
          provide: ListViewModel,
          useValue: viewModel,
        },
      ],
    })
      .overrideComponent(ListComponent, {
        set: {
          providers: [
            {
              provide: ListViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .overrideComponent(PostCardComponent, {
        set: {
          selector: 'app-post-card',
          template: `<span>app-post-card</span>`,
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
