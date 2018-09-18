import { Injectable } from '@angular/core';
import { Settings } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
    showBalanceUpdate: false
  }

  constructor() { }

  getSettings(): Settings {
    return this.settings;
  }

  setSettings(settings: Settings) {
    this.settings = settings;
  }
}
