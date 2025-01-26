import { NgFor, NgIf } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { Observable, of, Subscription, take } from 'rxjs'

import Feed from '../../../core/models/Feed.type'
import Post from '../../../core/models/Post.type'
import { FeedService } from '../../../core/services'
import { PostCardComponent } from '../../../shared'

@Component({
  selector: 'app-list-posts',
  imports: [
    NgFor, NgIf,
    PostCardComponent,
    ButtonModule, RouterModule,
  ],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css',
})
export class ListPostsComponent implements OnInit, OnDestroy {
  private feedSubscription: Subscription | null = null

  public feed$ = of<Feed>({
    uuid: 'uuid',
    posts: [
      {
        uuid: 'uuid',
        slug: 'name',
        title: 'name',
        content: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.',
        topic_uuid: 'uuid',
        author_uuid: 'uuid',
        author_name: 'author_name',
        created_at: new Date('2025-01-01'),
        updated_at: new Date('2025-01-01'),
      },
      {
        uuid: 'uuid',
        slug: 'name',
        title: 'name',
        content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
        topic_uuid: 'uuid',
        author_uuid: 'uuid',
        author_name: 'author_name',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: 'uuid',
        slug: 'name',
        title: 'name',
        content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
        topic_uuid: 'uuid',
        author_uuid: 'uuid',
        author_name: 'author_name',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: 'uuid',
        slug: 'name',
        title: 'name',
        content: 'Content: lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
        topic_uuid: 'uuid',
        author_uuid: 'uuid',
        author_name: 'author_name',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  })

  public postList$: Observable<Post[]>

  public postList: Post[] = []

  constructor(private feedService: FeedService) {
    this.postList$ = feedService.getFeedList()
  }

  ngOnInit(): void {
    this.feedService.loadInitialData()
      .pipe(take(1))
      .subscribe()
    this.feedSubscription = this.feed$
      .subscribe((posts) => {
        this.postList = posts as never as Post[]
      })
    this.postList$
      .subscribe((posts) => {
        this.postList = posts
      })
  }

  ngOnDestroy(): void {
    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe()
    }
  }
}
