import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../Services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/Shared/Components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogpost;
  categories$?:Observable<Category[]>;
  isImageSelectorVisible:boolean=false;
  imageSelectorSubscription?:Subscription;
  constructor(private blogPostService:BlogPostService, private router:Router,
    private categoryService:CategoryService, private imageService:ImageService){
    this.model={
      Title:'',
      ShortDescription:'',
      UrlHandle:'',
      Content:'',
      FeatureImageUrl:'',
      Author:'',
      IsVisible:true,
      PublishedDate:new Date(),
      categories:[]
    }
  }
  
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    this.imageSelectorSubscription=this.imageService.onSelectImage().subscribe({
      next:(selectedImage)=>{
        this.model.FeatureImageUrl=selectedImage.imageUrl;
        this.closeImageSelector();
      }
    })
  }

  onFormSubmit():void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next:(response)=>
      {
          this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

  openImageSelector():void{
    this.isImageSelectorVisible=true;
  }

  closeImageSelector():void{
    this.isImageSelectorVisible=false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }

  
}
