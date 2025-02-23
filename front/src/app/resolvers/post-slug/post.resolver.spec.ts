import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { PostService } from '@core/services'
import { PostResolver } from './post.resolver'

describe('PostResolver', () => {
  let resolver: PostResolver
  let postService: PostService

  beforeEach(() => {
    postService = jasmine.createSpyObj('PostService', ['getBySlug'])

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: PostService,
          useValue: postService,
        },
      ],
    })
    resolver = TestBed.inject(PostResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
