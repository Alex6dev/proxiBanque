import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface/user';

export const ACCESS_TOKEN_MAIL='accessTokenMail';
export const ACCESS_TOKEN_MDP='accessTokenMdp';
export const ACCESS_TOKEN_ID='accessTokenId';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser=new BehaviorSubject<User>({user: null,typeUser:null});
  currentUserObs$= this.currentUser.asObservable();

  setCurrentUser(auth: User):void {
    this.currentUser.next(auth); 
  }

  logout():void{
    this.setTokenInSession(null,null,null);
    this.currentUser.next( {user:null,typeUser:null} );
  }
  setTokenInSession( tokenMail:string|null, tokenMdp:string|null, tokenId:string |null):void {

    tokenMail==null? window.sessionStorage.removeItem(ACCESS_TOKEN_MAIL) : window.sessionStorage.setItem(ACCESS_TOKEN_MAIL, tokenMail);
    tokenMdp==null? window.sessionStorage.removeItem(ACCESS_TOKEN_MDP) : window.sessionStorage.setItem(ACCESS_TOKEN_MDP, tokenMdp);
    tokenId==null? window.sessionStorage.removeItem(ACCESS_TOKEN_ID) : window.sessionStorage.setItem(ACCESS_TOKEN_ID, tokenId);
  }
 
  isPresentTokenInSession() :boolean {
    return window.sessionStorage.getItem(ACCESS_TOKEN_MAIL)==null? false:true;
  }

}
