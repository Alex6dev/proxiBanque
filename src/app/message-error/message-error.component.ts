import { Component } from '@angular/core';
import { MessageError } from '../interface/message-error';
import { MessageErrorService } from '../message-error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.css']
})
export class MessageErrorComponent {
  sub:Subscription=new Subscription();
  message:MessageError={status:null,message:null};
  
  constructor(private messageErrorService:MessageErrorService){}

  ngOnInit():void{
    this.sub=this.messageErrorService.currentClientsObs$.subscribe(messageError=>{
      this.message=messageError;
    })
  }

  clearMessage():void{
    this.messageErrorService.setMessageError({status:null,message:null});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
