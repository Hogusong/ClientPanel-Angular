import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,    
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  onLogout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.flashMessage.show("You are now logged out", { 
      cssClass: 'alert-danger', timeout: 3000}) 
    this.router.navigate(['/'])
  }
}
