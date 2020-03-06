import { Component, OnInit } from '@angular/core';
import { PostsService } from "./services/posts/posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getPostsFromServer();
    this.postsService.emitPostSubject();
  }
}
