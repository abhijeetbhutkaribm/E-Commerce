import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $isAuthenticate: Observable<boolean>
  private Authflag=new Subject<any>()

  constructor() {
    this.$isAuthenticate=this.Authflag.asObservable();
   }

   authMethod(data){
    console.log(data)
    this.Authflag.next(data);
   }
}
