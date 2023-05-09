import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate: boolean = false;

  login(email: string, mobile: string): Observable<boolean> {
    if (email === 'admin@gmail.com' && mobile === 'admin') {
      this.isAuthenticate = true;
      return of(true);
    }
    return of(false);
  }

  constructor() { }
}
