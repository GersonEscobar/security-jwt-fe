import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'marcaje-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private authService: AuthService,
              private router: Router,){}

  onLogout(){
    this.authService.logout();
    alert('Saliste correctamente.');
    this.router.navigate(['/home']);
  }


}
