import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/marcaje/services/Auth.service';
import { LoginService } from 'src/app/marcaje/services/login.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService,
              private router: Router){}

  onLogout(){
    this.authService.logout();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
