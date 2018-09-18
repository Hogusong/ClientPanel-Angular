import { Injectable } from '@angular/core';
import { Settings } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings  = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
    showBalanceUpdate: false        
  };

  constructor() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    this.settings = settings;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
