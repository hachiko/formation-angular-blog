import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from "../../models/Post.model";
import { PostsService } from "../../services/posts/posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() posts: Array<Post>;
  postSubscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postSubscription = this.postsService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts
      }
    );
    this.postsService.emitPostSubject();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
