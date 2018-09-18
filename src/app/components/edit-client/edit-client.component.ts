import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client, Settings } from '../../models/models';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string = '';
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  settings: Settings;
  
  pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService, 
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    // Get id from url
    this.id = this.route.snapshot.params['id']
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        this.client = client
      } else {
        this.client = null;
        this.flashMessage.show("This client does not exist any more.", {cssClass: 'alert-danger', timeout: 3000});
      }
    });    
  }

  onSubmit({ value, valid }: {value: Client, valid: boolean}) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      // Add new client
      this.clientService.updateClient(this.client);
      // Show message
      this.flashMessage.show('Successfully updated . . . ', {
        cssClass: 'alert-success', timeout: 3000
      });
      // Redirect to dashboard
      this.router.navigate(['/client/'+this.id])
    }
  }
}
