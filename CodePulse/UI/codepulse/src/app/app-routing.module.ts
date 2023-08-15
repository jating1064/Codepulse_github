import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/BlogPosts/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/BlogPosts/add-blogpost/add-blogpost.component';
import { CommonModule } from '@angular/common';
import { EditBlogpostComponent } from './features/BlogPosts/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'admin/categories',
    component:CategoryListComponent,
    canActivate:[authGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'blog/:url',
    component:BlogDetailsComponent
  },
  {
    path:'admin/categories/add',
    component:AddCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts',
    component:BlogpostListComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts/add',
    component:AddBlogpostComponent,
    canActivate:[authGuard]

  },
  {
    path:'admin/blogposts/:id',
    component:EditBlogpostComponent,
    canActivate:[authGuard]

  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[BlogpostListComponent]
})
export class AppRoutingModule { }
