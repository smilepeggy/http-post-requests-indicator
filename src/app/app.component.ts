import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.module";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log(this.isFetching);
    this.onFetchPosts();
  }

  // onCreatePost(postData: { title: string; content: string }) {
  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        "https://ng-http-e04e7.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    console.log(this.isFetching);
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    console.log(this.isFetching);
    this.http
      // .get("https://ng-http-e04e7.firebaseio.com/posts.json")
      .get<{ [key: string]: Post }>(
        "https://ng-http-e04e7.firebaseio.com/posts.json"
      )
      .pipe(
        // map((responseData:{[key:string]:Post}) => {
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
              console.log(key); // -MDkyiQZj9UqwYgSxCFs
            }
          }
          return postsArray;
        })
      )
      .subscribe((posts) => {
        this.isFetching = false;
        console.log(posts); //[{...}]
        this.loadedPosts = posts;
      });
  }
}
