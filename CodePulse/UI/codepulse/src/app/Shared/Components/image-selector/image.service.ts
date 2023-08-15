import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage:BehaviorSubject<BlogImage>= new BehaviorSubject<BlogImage>({
    id:'',
    fileExtension:'',
    fileName:'',
    title:'',
    imageUrl:''
  })

  constructor(private http:HttpClient){ }

  uploadImage(file:File, fileName:string, title:string):Observable<BlogImage>{
    const formData= new FormData();
    formData.append('File',file);
    formData.append('FileName',fileName);
    formData.append('Title',title);
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`,formData);
  }

  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  selectImage(image:BlogImage):void{
    this.selectedImage.next(image);
  }

  onSelectImage():Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }
  
}
