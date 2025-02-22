import { ComponentFixture, TestBed } from '@angular/core/testing'

import { signal } from '@angular/core'
import { Comment } from '@core/interfaces'
import { MarkdownEditorComponent } from '@shared/index'
import { of } from 'rxjs'
import { ListComponent } from './list.component'
import ListViewModel from './list.viewmodel'

describe('ListCommentsComponent', () => {
  let component: ListComponent
  let fixture: ComponentFixture<ListComponent>
  let viewModel: ListViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('ListCommentsViewModel', ['fetchComments'], {
      comments: signal<Comment[]>([]),
    })

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
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
      .overrideComponent(MarkdownEditorComponent, {
        set: {
          selector: 'app-markdown-editor',
          template: `<span>app-markdown-editor</span>`,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ListComponent)
    fixture.componentRef.setInput('postUuid', 'postUuid')
    fixture.componentRef.setInput('reloadComments', of())
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
