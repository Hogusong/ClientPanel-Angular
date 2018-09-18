import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirm: string;
  pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.password != this.confirm) {
      this.flashMessage.show("Passwords are not matched ...", {
        cssClass: 'alert-danger', timeout: 3000
      })
    } else {
      this.authService.register(this.email, this.password)
        .then( res => {
          this.flashMessage.show("You ar now registered and logged in", {
            cssClass: 'alert-success', timeout: 3000
          });
          this.router.navigate(['/']);
        })
        .catch( err => {
          this.flashMessage.show(err.message, {
            cssClass: 'alert-danger', timeout: 3000
          });
        });
    }
  }

  isMatched() {
    return this.password === this.confirm;
  }
}
