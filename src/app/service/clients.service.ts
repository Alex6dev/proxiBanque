import { Injectable } from '@angular/core';
import { Client } from '../interface/client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environement } from 'src/environements/environement';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ACCESS_TOKEN_ID } from './user.service';
import { MessageErrorService } from '../message-error.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private urlClients=environement.apiUrl+"/api/clients";
  private urlClient = environement.apiUrl+"/api/client";

  private currentClients=new BehaviorSubject<Client[]>([]);
  currentClientsObs$=this.currentClients.asObservable();

  constructor(
    private http: HttpClient,
    private router:Router,
    private messageErrorService:MessageErrorService
  ) {}


  getClientById(id) {
    return this.currentClients.value.find((element) => element.id == id);
  }
  setCurentClients(clients:Client[]){
    this.currentClients.next(clients)
  }

  getListClient(idUser:string){
    
    this.http.post<Client[]>(this.urlClients,Number.parseInt(idUser)).subscribe({
      next:(value:Client[])=>{
        this.setCurentClients(value);
      },
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    })
  }

  deleteClient(id) {
    this.http.delete(this.urlClient+"/"+id).subscribe({
      next:( ) => {
        this.getListClient(window.sessionStorage.getItem(ACCESS_TOKEN_ID))
        this.router.navigateByUrl('/management/dashboard')
      },
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    })
  }

  addClient(newClient:FormGroup,idUser:string) {
    const body = JSON.parse(`
    {
      "name":"${newClient.value.name}",
      "firstName":"${newClient.value.firstName}",
      "address":"${newClient.value.address}",
      "postcode":"${newClient.value.postcode}",
      "city":"${newClient.value.city}",
      "phone":"${newClient.value.phone}",
      "advisorId":${idUser}
    }
    `);

    this.http.post(this.urlClient, body).subscribe({
      next:(value:Client)=>{
        let clients= this.currentClients.value;
        clients.push(value);
        this.setCurentClients(clients);
        this.router.navigateByUrl('/management/dashboard');
      },
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    });
  }

  updateClient(client:FormGroup,idUser:string){ 
    const body = JSON.parse(`
    {
      "id":"${client.value.id}",
      "name":"${client.value.name}",
      "firstName":"${client.value.firstName}",
      "address":"${client.value.address}",
      "postcode":"${client.value.postcode}",
      "city":"${client.value.city}",
      "phone":"${client.value.phone}",
      "advisorId":${idUser}
    }
    `)
    this.http.put(this.urlClient,body).subscribe({
      next:(value:Client ) => {
        let clients = this.currentClients.value;
        const index = clients.findIndex((element) => element.id == value.id);
        clients[index] = value;
        this.setCurentClients(clients);
        this.router.navigate(['/','management','client',client.value.id])
      },
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    })
  }
}
