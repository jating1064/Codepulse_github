import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{
  

  id:string | null=null;
  paramsSubscription?: Subscription;
  category?: Category;
  editCategorySubscription?:Subscription;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router ) {
 
  }    
   
  ngOnInit(): void {
     this.paramsSubscription=this.route.paramMap.subscribe({
       next:(params)=>{
        this.id= params.get('id');
        if(this.id){
          //get the data from API for this category id 
          this.categoryService.getCategoryById(this.id).
          subscribe({
            next:(response)=>{
                this.category=response;
            }
          })
        }
     }
     });
   }

   ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

  onDelete(): void{
    if(this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next:(response)=>{
          //navigate to list page
          this.router.navigateByUrl(`/admin/categories`);
        }        
      })
    }
  }

  onFormSubmit():void{
    //console.log(this.category);
    const updateCategoryRequest:UpdateCategoryRequest={
        name:this.category?.name??'',
        urlHandle:this.category?.urlHandle??''
    }
    //Pass this object to service
    if(this.id){
      this.editCategorySubscription=this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next:(response)=>{
          // On success, we navigate back to the categories list page
          this.router.navigateByUrl(`/admin/categories`);
        }
      })
    }
  }

  
    
  
}
