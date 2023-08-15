import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
// import { BlogPost } from '../models/blog-Post.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  createBlogPost(data:AddBlogpost):Observable<BlogPost>{

    return this.http.post<BlogPost>(`${
      environment.apiBaseUrl}/api/blogposts?addAuth=true`,data);
  }

  getAllBlogPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>
    (`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id:string):Observable<BlogPost>{
    return this.http.get<BlogPost>
    (`${environment.apiBaseUrl}/api/blogposts/${id}`); 
  }

  getBlogPostByUrlHandle(urlHandle:string):Observable<BlogPost>{
    return this.http.get<BlogPost>
    (`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`); 
  }

  updateBlogPost(id:string, updatedBlogPost:UpdateBlogPost):Observable<BlogPost>
  {
    return this.http.put<BlogPost>
    (`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`,updatedBlogPost);

  }

  deleteBlogPost(id:string):Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }

}
