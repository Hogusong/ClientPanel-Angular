import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  showRegister: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,   
    private settingsService: SettingsService 
  ) { }

  ngOnInit() {
    // this.showRegister = this.settingsService.getSettings().allowRegistration
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
