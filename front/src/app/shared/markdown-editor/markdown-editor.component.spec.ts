import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Component, input, signal } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MarkdownComponent } from 'ngx-markdown'
import { MarkdownEditorComponent } from './markdown-editor.component'
import MarkdownEditorViewModel from './markdown-editor.viewmodel'

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

describe('MarkdownEditorComponent', () => {
  let component: MarkdownEditorComponent
  let fixture: ComponentFixture<MarkdownEditorComponent>
  let viewModel: MarkdownEditorViewModel
  let formControl: FormControl
  let value: string
  let ariaLabel: string

  beforeEach(async () => {
    viewModel = jasmine.createSpyObj('MarkdownEditorViewModel', [
      'setValue', 'resetError', 'setError',
    ], {
      value: signal<string>(''),
      errorMessage: signal<string>(''),
    })
    formControl = new FormControl('')
    value = 'value'
    ariaLabel = 'ariaLabel'

    await TestBed.configureTestingModule({
      imports: [MarkdownEditorComponent],
      providers: [
        {
          provide: MarkdownEditorViewModel,
          useValue: viewModel,
        },
      ],
    })
      .overrideComponent(MarkdownEditorComponent, {
        add: {
          imports: [
            MockMarkdownComponent,
          ],
        },
        remove: {
          imports: [
            MarkdownComponent,
          ],
        },
      })
      .overrideComponent(MarkdownEditorComponent, {
        set: {
          providers: [
            {
              provide: MarkdownEditorViewModel,
              useValue: viewModel,
            },
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(MarkdownEditorComponent)
    fixture.componentRef.setInput('title', 'Title')
    fixture.componentRef.setInput('textareaInput', formControl)
    fixture.componentRef.setInput('value', value)
    fixture.componentRef.setInput('ariaLabel', ariaLabel)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
