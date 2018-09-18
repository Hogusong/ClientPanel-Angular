import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/models';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id']
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        this.client = client
        this.hasBalance = client.balance === 0 ? false : true;
      } else {
        this.client = null;
        this.flashMessage.show("This client does not exist any more.", {cssClass: 'alert-danger', timeout: 2000});
        // Redirect to dashboard
        this.router.navigate(['/'])
      }
    });
  }

  updateBalance(balance: number) {
    this.client.balance = balance;
    this.clientService.updateClient(this.client);
    this.showBalanceUpdateInput = false;
    this.flashMessage.show('Balance updated', {cssClass: 'alert-success', timeout: 2000})
  }

  onDeleteClient() {
    if (this.client.balance === 0) {
      if (confirm("Are you sure to delete " + this.client.firstName + "'s record? . . .")) {
        this.clientService.deleteClient(this.client);
        this.flashMessage.show(this.client.firstName + "'s record was removed ...", { cssClass: 'alert-success', timeout: 2000});
        // Redirect to dashboard
        this.router.navigate(['/'])
      } else {
        this.flashMessage.show("Deleting was canceled by user.", {
          cssClass: 'alert-danger', timeout: 2000});
      }
    } else {
      this.flashMessage.show("Fail to delete " + this.client.firstName + "' record. Balance is not Zero.", {cssClass: 'alert-danger', timeout: 2000});
    }
  }
}
