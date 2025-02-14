import { ComponentFixture, TestBed } from '@angular/core/testing'

import MarkdownEditorViewModel from './markdown-editor.viewmodel'

describe('MarkdownEditorViewModel', () => {
  let viewModel: MarkdownEditorViewModel
  let fixture: ComponentFixture<MarkdownEditorViewModel>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownEditorViewModel],
    })
      .compileComponents()

    fixture = TestBed.createComponent(MarkdownEditorViewModel)
    viewModel = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
