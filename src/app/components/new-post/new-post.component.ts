import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts/posts.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
  }

  addPost(form: NgForm) {
    const title = form.value['title'];
    const content = form.value['content'];
    this.postsService.addPost(title, content);
    this.router.navigate(['/posts']);
  }

}
