import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MarkdownEditorComponent } from '@shared/index'
import { AddComponent } from './add.component'
import AddViewModel from './add.viewmodel'

describe('AddCommentComponent', () => {
  let component: AddComponent
  let fixture: ComponentFixture<AddComponent>
  let viewModel: AddViewModel

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('AddViewModel', {
      content: '',
      formErrorMessage: '',
    }, {
      postUuid: 'post-uuid',
      errorMessage: 'error-message',
      errors: {
        content: () => 'content-error',
      },
    })

    await TestBed.configureTestingModule({
      imports: [
        AddComponent,
      ],
      providers: [
        { provide: AddViewModel, useValue: viewModel },
      ],
    })
      .overrideComponent(AddComponent, {
        set: {
          providers: [
            { provide: AddViewModel, useValue: viewModel },
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

    fixture = TestBed.createComponent(AddComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
