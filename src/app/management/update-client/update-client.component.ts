import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessageErrorService } from 'src/app/message-error.service';
import { ClientsService } from 'src/app/service/clients.service';
import { ACCESS_TOKEN_ID } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent {

  clientUpdate: FormGroup;
  idClient:string;
  constructor(
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private messError:MessageErrorService
   ) { }

  

  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe({
      next: (p:ParamMap) => {
        this.idClient=p.get('idClient');
        let client = this.clientsService.getClientById(this.idClient);
        this.clientUpdate = new FormGroup({
          id:new FormControl(client.id, [Validators.required]),
          name:new FormControl(client.name, [Validators.required,Validators.pattern('[a-zA-Z]*')]),
          firstName: new FormControl(client.firstName, [Validators.required,Validators.pattern('[a-zA-Z]*')]),
          address: new FormControl(client.address, [Validators.required]),
          postcode: new FormControl(client.postcode, [Validators.required]),
          city:new FormControl(client.city, [Validators.required]),
          phone:new FormControl(client.phone, [Validators.required]),
        });
      },
    })

  }

  onUpdate() {
    
    if(this.clientUpdate.valid){
      this.clientsService.updateClient(this.clientUpdate, window.sessionStorage.getItem(ACCESS_TOKEN_ID))

    }
    else{
      this.messError.setMessageError({
        status:null,
        message:"Merci de remplir tous les champs"
      })
    }
    
  }     
}
