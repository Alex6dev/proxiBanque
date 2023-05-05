import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageError } from './interface/message-error';

@Injectable({
  providedIn: 'root'
})
export class MessageErrorService {
  
  private currentClients=new Subject<MessageError>();
  currentClientsObs$=this.currentClients.asObservable();

  constructor() { }

  setMessageError(message:MessageError){
    this.currentClients.next(message);
  }
}
