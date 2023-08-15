import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?:User;

  constructor(private authService:AuthService, private router:Router){

  }

  ngOnInit(): void {
    this.authService.User()
    .subscribe({
      next:(response)=>{
        //console.log(response);
        this.user=response;
      }
    });
    this.user=this.authService.getUser();
  }

  onLogout():void{
    //clear out Auth cookie and LocalStorage
    this.authService.logout();
    //bring user to homePage
    this.router.navigateByUrl('/');
  }

}
