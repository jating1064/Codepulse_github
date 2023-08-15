import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../Services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
//import { BlogPost } from '../models/blog-post.model copy';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  
  blogPosts$?:Observable<BlogPost[]>;
  //blogPosts?: BlogPost[];
  //blogPosts?: BlogPost[];
  //blogPosts?: BlogPost[];

  constructor(private blogPostService : BlogPostService){

  }

//   ngOnInit(): void {
//     this.paramsSubscription=this.route.paramMap.subscribe({
//       next:(params)=>{
//        this.id= params.get('id');
//        if(this.id){
//          //get the data from API for this category id 
//          this.categoryService.getCategoryById(this.id).
//          subscribe({
//            next:(response)=>{
//                this.category=response;
//            }
//          })
//        }
//     }
//     });
//   }

//   ngOnDestroy(): void {
//    this.paramsSubscription?.unsubscribe();
//    this.editCategorySubscription?.unsubscribe();
//  }

  
  ngOnInit(): void {
     //get All BP from API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    // .subscribe({
    //   next:(response)=>{
    //     this.blogPosts=response;
    //   }
    // });
  }

}
