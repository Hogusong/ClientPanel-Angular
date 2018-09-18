import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingsService } from '../services/settings.service';
import { Settings } from '../models/models';

@Injectable()
export class RegisterGuard implements CanActivate{
  settings: Settings;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private settingsService: SettingsService
  ) { 
    this.settings = this.settingsService.getSettings();
  }

  // canActivate(): Observable<boolean> {
  //   return this.afAuth.authState.pipe(map(auth => {
  //     if(!auth) {
  //       this.router.navigate(['/login']);
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }));
  // }

  canActivate(): boolean {
    if (this.settings.allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

