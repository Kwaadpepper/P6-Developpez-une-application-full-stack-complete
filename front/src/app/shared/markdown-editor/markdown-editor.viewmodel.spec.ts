import { TestBed } from '@angular/core/testing'

import { MarkdownEditorViewModel } from './markdown-editor.viewmodel'

describe('MarkdownEditorViewModel', () => {
  let viewModel: MarkdownEditorViewModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({})

    viewModel = TestBed.inject(MarkdownEditorViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
