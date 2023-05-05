import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageErrorService } from 'src/app/message-error.service';
import { ClientsService } from 'src/app/service/clients.service';
import { ACCESS_TOKEN_ID } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  newClient: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private messageErrorService:MessageErrorService
  ) {}


  ngOnInit(){
    this.newClient= new FormGroup({
      name:new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z]*')]),
      firstName: new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z]*')]),
      address: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null, [Validators.required]),
      city:new FormControl(null, [Validators.required]),
      phone:new FormControl(null, [Validators.required]),
    })
  }
  onSubmit() {    
    if(this.newClient.valid)
      this.clientsService.addClient(this.newClient, window.sessionStorage.getItem(ACCESS_TOKEN_ID));
    else{
      this.messageErrorService.setMessageError({
        status:null,
        message:"Merci de remplir tous les champs"
      })
    }
  }
}
