import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';
import { ImageService } from 'src/app/Shared/Components/image-selector/image.service';


@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id:string|null=null;
  routeSubscription?:Subscription;
  model?:BlogPost;
  categories$?:Observable<Category[]>;
  selectedCategories$?:string[];
  updateBlogPostSubscription?:Subscription;
  getBlogPostSubscription?:Subscription;
  deleteBlogPostSubscription?:Subscription;
  isImageSelectorVisible:boolean=false;
  imageSelectorSubscription?:Subscription;

  constructor(private route:ActivatedRoute, private blogPostService:BlogPostService,
    private categoryService:CategoryService, private router: Router, private imageService:ImageService){

  } 
 

  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    this.routeSubscription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
        //Get BP from API
        if(this.id){
        this.getBlogPostSubscription=this.blogPostService.getBlogPostById(this.id).subscribe({
          next:(response)=>{
            //We will use response to store it in a local var of type blogpost
            this.model=response;
            this.selectedCategories$=response.categories.map(x=>x.id);
          }

        });
        }
        this.imageService.onSelectImage()
        .subscribe({
          next:(response)=>{
            if(this.model){
              this.model.featureImageUrl=response.imageUrl;
              this.isImageSelectorVisible=false;

            }
          }
        })

      }
    })
  }

  onFormSubmit():void{
    //Convert the model to request object
    if(this.model && this.id){
      var updateBlogPost : UpdateBlogPost={
        Author:this.model.author,
        Content:this.model.content,
        FeatureImageUrl:this.model.featureImageUrl,
        UrlHandle:this.model.urlHandle,
        Title:this.model.title,
        ShortDescription:this.model.shortDescription,
        PublishedDate:this.model.publishedDate,
        IsVisible:this.model.isVisible,
        categories:this.selectedCategories$??[]
      };
      this.updateBlogPostSubscription=this.blogPostService.updateBlogPost(this.id,updateBlogPost)
      .subscribe({
        next:(response)=>{
          //Success Response
          //We will navigate to the list page using a router
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  onDelete():void{
    if(this.id){
      //call the service and delete BP
      this.deleteBlogPostSubscription=this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next:(response)=>{
          //success: navigate back to the lists page because this resource no longer exists 
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }
  }

  openImageSelector():void{
    this.isImageSelectorVisible=true;
  }

  closeImageSelector():void{
    this.isImageSelectorVisible=false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }

}
