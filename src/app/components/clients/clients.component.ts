import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/models';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalBalance: number = 0;

  constructor(
    private clientService: ClientService,
    private authService: AuthService  
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.clientService.getClients().subscribe(clients => {
          this.clients = clients;
          this.getTotalBalance()
        });    
      } else {
        this.clients = null;
        this.totalBalance = 0;
      }
    })
  }

  getTotalBalance() {
    this.totalBalance = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
    // this.totalBalance = 0;
    // this.clients.forEach(client => this.totalBalance += client.balance);
  }

}
