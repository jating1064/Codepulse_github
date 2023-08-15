import { Category } from "../../category/models/category.model";

export interface BlogPost{
     title:string;
     id:string;   
     shortDescription:string;
     content:string;
     featureImageUrl :string;
     urlHandle :string;
     author:string;
     publishedDate:Date;
     isVisible :boolean;
     categories: Category[];
 }
// export interface BlogPost{
// Title:string;
// id:string,
// ShortDescription:string;
// Content:string;
// FeatureImageUrl :string;
// UrlHandle :string;
// Author:string;
// PublishedDate:Date;
// IsVisible :boolean;
// categories: Category[]
// }