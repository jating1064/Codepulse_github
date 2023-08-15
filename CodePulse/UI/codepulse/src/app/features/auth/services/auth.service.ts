import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User|undefined>(undefined);
  //initially undefined


  constructor(private http:HttpClient, private cookieService:CookieService) { }

    login(request:LoginRequest):Observable<LoginResponse>{
      return this.http.post<LoginResponse>
    (`${environment.apiBaseUrl}/api/auth/login`,{
      email: request.email,
      password: request.password
    });
    }

    setUser(user: User):void{

      this.$user.next(user);
      //store these 2 values email and roles in local storage
      localStorage.setItem('user-email', user.email);
      localStorage.setItem('user-roles',user.roles.join(','));
      //if user has multiple roles, they will be joined using a comma

    }

    getUser():User|undefined
    {
      //construct the user object
      const email=localStorage.getItem('user-email');
      const roles=localStorage.getItem('user-roles');

      if(email && roles){
        const user:User={
          email:email,
          roles:roles.split(',')
        };
        return user;
      }

      return undefined;
    }

    User():Observable<User|undefined>{
      return this.$user.asObservable();
    }

    logout():void{
      localStorage.clear();
      this.cookieService.delete('Authorization','/');
      //emit a new user with value of undefined
      this.$user.next(undefined);
    }

}
