import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Advisor } from '../interface/user';
import { HttpClient } from '@angular/common/http';
import { MessageErrorService } from '../message-error.service';
import { environement } from 'src/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class AdvisorsService {

  private advisors=new BehaviorSubject<Advisor[]>([]);
  advisorsObs$= this.advisors.asObservable();
  
  private urlGetAllAdvisorsByIdManager=environement.apiUrl+"/api/advisors/manager/"
  constructor(private http: HttpClient, private messageErrorService:MessageErrorService) { }

  setAdvisors(advisors: Advisor[]):void {
    this.advisors.next(advisors); 
  }

  getAllAdvisors(idUser:string):void{
    this.http.get(this.urlGetAllAdvisorsByIdManager+idUser).subscribe({
      next:(value:Advisor[])=>{
        console.log(value)
        this.setAdvisors(value);
      },
      error:(err)=>{
        this.messageErrorService.setMessageError( {status:err.status,message:err.error} )
      }
    })
  }
}
