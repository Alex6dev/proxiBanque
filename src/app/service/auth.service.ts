import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormAuth } from '../interface/form';
import { Advisor, Manager, UserDto } from '../interface/user';
import { ACCESS_TOKEN_MAIL, ACCESS_TOKEN_MDP, UserService } from './user.service';
import { Router } from '@angular/router';
import { MessageErrorService } from '../message-error.service';
import { ClientsService } from './clients.service';
import { AdvisorsService } from './advisors.service';
import { environement } from 'src/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlAuth=environement.apiUrl+"/api/auth";


  constructor(
    private http: HttpClient, 
    private clientsService:ClientsService, 
    private userService: UserService,
    private router:Router,
    private messageErrorService:MessageErrorService,
    private advisorsService:AdvisorsService
  ) {}
  

  
  authentification(form:FormAuth,isFirstConnect:boolean){
    this.http.post<UserDto>(this.urlAuth,form).subscribe({
      next:(value)=>{
        console.log(value)
        let userCurrent:Advisor|Manager={
          id:value.id,
          name:value.name,
          firstName:value.firstName,
          phone:value.phone,
          mail:value.mail,
        }

        this.userService.setCurrentUser({
          user:userCurrent,
          typeUser:value.typeUser
        });
        
        this.userService.setTokenInSession(form.identifiant,form.mdp,value.id);
        if(value.typeUser=="ADVISOR")
          this.clientsService.getListClient(value.id);
        else
          this.advisorsService.getAllAdvisors(value.id);
          
        isFirstConnect?this.router.navigateByUrl('/management/dashboard'):null;
        
      },
      error:(err)=>{
        this.messageErrorService.setMessageError( {status:err.status,message:"L'identifiant ou le mot de passe est incorrect !"} )
      }
    })
    
  }

  reloadPage() {
    const tokenMail=window.sessionStorage.getItem(ACCESS_TOKEN_MAIL);
    const tokenMdp=window.sessionStorage.getItem(ACCESS_TOKEN_MDP);
    tokenMail==null? null : this.authentification({identifiant:tokenMail,mdp:tokenMdp},false); 
  }
}
