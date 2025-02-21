import { TestBed } from '@angular/core/testing'

import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import ShowViewModel from './show.viewmodel'

describe('ShowViewModel', () => {
  let viewModel: ShowViewModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              post: of({
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
            },
          },
        },
      }],
    })

    viewModel = TestBed.inject(ShowViewModel)
  })

  it('should create', () => {
    expect(viewModel).toBeTruthy()
  })
})
