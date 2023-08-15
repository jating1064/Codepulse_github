import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
 
  //return true;
  //check for JWT token
  let token= cookieService.get('Authorization');

  if(token && user){
    
    // clear bearer word and decode the token
    token= token.replace('Bearer','');
    const decodedToken:any = jwtDecode(token);
    //check Token(expired/not)
    const expiryDate=decodedToken.exp*1000;
    const currentTime= new Date().getTime();

    if(expiryDate<currentTime){
      //Token expired
      //logout
      authService.logout();
      //Navigate the user to login page
      return router.createUrlTree(['/login'],{queryParams:{returnUrl : state.url}})   
    }
    else{
      //Token not expired
      //check for local storage roles
      if(user?.roles.includes('Writer')){
        return true;
      }else{
        alert('Unauthorized');
        return false;
      }
    }
  }
  else{
    //logout
    authService.logout();
    //Navigate the user to login page
    return router.createUrlTree(['/login'],{queryParams:{returnUrl : state.url}})
  }
  
  
};
