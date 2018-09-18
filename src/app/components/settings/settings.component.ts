import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,   
    private settingsService: SettingsService 
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings()
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show("Setting was successful", {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/']);
  }
}
