import { Injectable } from '@angular/core';
import { AcceptLoanDto, Loan } from '../interface/loan';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageErrorService } from '../message-error.service';
import { environement } from 'src/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private currentLoans=new BehaviorSubject<Loan[]>([]);
  currentLoansObs$=this.currentLoans.asObservable();

  private urlGetAllLoanByIdClient=environement.apiUrl+"/api/loans/"
  private urlAcceptLoan=environement.apiUrl+"/api/loan"

  constructor(
    private http:HttpClient,
    private router:Router,
    private messageErrorService:MessageErrorService
  ) { }
  
  setCurrentLoans(loans:Loan[]){
    this.currentLoans.next(loans);
  }

  getAllLoanByIdClient(idClient:string){
    this.http.get(this.urlGetAllLoanByIdClient+idClient).subscribe({
      next:((value:Loan[])=>{
        this.setCurrentLoans(value);
      }),
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    })
  }

  acceptLoan(acceptLoanDto:AcceptLoanDto){
    acceptLoanDto.loan.accept=true;
    this.http.put(this.urlAcceptLoan,acceptLoanDto).subscribe({
      next:(value:Loan)=>{
        let loans=this.currentLoans.value;
        const index=loans.findIndex(loan=>loan.id==value.id);
        loans[index]=value;
        this.setCurrentLoans(loans);
      },
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    })
  }

  quoteSend(formLoan:FormGroup,idClient:string){
    const body = JSON.parse(`
    {
      "initialAmount":"${formLoan.value.initialAmount}",
      "duration":"${formLoan.value.duration}",
      "interestRate":"${formLoan.value.interestRate}",
      "insuranceRate":"${formLoan.value.insuranceRate}",
      "clientId":${idClient}
    }
    `);
    this.http.post(this.urlAcceptLoan,body).subscribe({
      next:(value:Loan)=>{
        let loans=this.currentLoans.value;
        loans.push(value);
        this.setCurrentLoans(loans);
        this.router.navigate(['/','management','client',idClient])
      },
      error:(err)=>{
        this.messageErrorService.setMessageError({status:err.status,message:err.error})
      }
    })
  }

}
