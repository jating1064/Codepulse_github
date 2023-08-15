export interface AddBlogpost{

    Title:string;
    ShortDescription:string;
    Content:string;
    FeatureImageUrl :string;
    UrlHandle :string;
    Author:string;
    PublishedDate:Date;
    IsVisible :boolean;
    categories: string[];
    
}