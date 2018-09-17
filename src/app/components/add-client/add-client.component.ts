import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/models';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  disableBalcnceOnAdd: boolean = false;
  pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService, 
    private clientService: ClientService,
    private router: Router
  ){ }

  ngOnInit() {
  }

  onSubmit({ value, valid }: {value: Client, valid: boolean}) {
    value.phone = value.phone? value.phone : '';
    value.balance = value.balance? value.balance : 0;

    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.addNewClient(value);
      // Show message
      this.flashMessage.show('Successfully added a new client', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dashboard
      this.router.navigate(['/'])
    }
  }

}
