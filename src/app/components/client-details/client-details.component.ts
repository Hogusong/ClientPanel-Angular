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
    private frashMessage: FlashMessagesService,
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
        this.frashMessage.show("This client does not exist any more.", {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  updateBalance(balance: number) {
    this.client.balance = balance;
    this.clientService.updateClient(this.client);
    this.showBalanceUpdateInput = false;
    this.frashMessage.show('Balance updated', {cssClass: 'alert-success', timeout: 2000})
  }
}
