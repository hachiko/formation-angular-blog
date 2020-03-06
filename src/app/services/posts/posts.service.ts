import { Injectable } from '@angular/core';
import { Post } from "../../models/Post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  emitPostSubject() {
    this.postSubject.next(this.posts.slice());
  }

  addPost(title: string, content: string) {
    const post = new Post(title, content, 0);
    this.posts.push(post);
    this.savePostsToServer();
    this.emitPostSubject();
  }

  removePost(postIndexToRemove: number) {
    this.posts.splice(postIndexToRemove, 1);
    this.savePostsToServer();
    this.emitPostSubject();
  }

  updateLoveIts(postIndex: number, isLiked: boolean) {
    const post = this.posts[postIndex];
    if (isLiked) {
      post.loveIts++;
    } else {
      post.loveIts--;
    }
    this.savePostsToServer();
    this.emitPostSubject();
  }

  getPostsFromServer() {
    this.httpClient
      .get<Post[]>('https://posts-angular-formation.firebaseio.com/posts.json')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostSubject();
        },
        (error) => {
          console.log('Erreur lors de la récupération depuis le serveur : ' + error);
        }
      );
  }

  savePostsToServer() {
    this.httpClient
      .put('https://posts-angular-formation.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur lors de la sauvegarde des posts : ' + error);
        }
      );
  }
}
