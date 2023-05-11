import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth.service';

@Injectable()
export class AuthGuard {
  constructor(private authService:AuthService){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.$isAuthenticate.subscribe(auth=>{
      console.log("Flag From login",auth);
      if(auth === true){
        return true
      }
    })
    return false;
      
  // CanActivateFn(currentUser: UserToken, userId: string): boolean {
  //   this.authService.$isAuthenticate.subscribe(authFlag=>{
  //     console.log("Kay yetai",authFlag);
  //     if(authFlag == true){
  //       return true
  //     }
  //   })
  //   return false;
  // }

  }
}
