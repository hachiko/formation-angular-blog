import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts/posts.service";

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created_at: Date;
  @Input() index:number;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  onLike(isLiked) {
    this.postsService.updateLoveIts(this.index, isLiked);
  }

  onDeletePost() {
    if (confirm('Etes-vous sûr de vouloir supprimer ce post ?')) {
      this.postsService.removePost(this.index);
      this.postsService.emitPostSubject();
    } else {
      return null;
    }
  }
}
