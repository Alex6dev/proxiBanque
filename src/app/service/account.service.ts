import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../interface/account';
import { FormTransfert } from '../interface/form';
import { Router } from '@angular/router';
import { MessageErrorService } from '../message-error.service';
import { Audit } from '../interface/audit';
import { environement } from 'src/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private urlAudit = environement.apiUrl+"/api/accounts/audit";
  private urlTransfer = environement.apiUrl + "/api/account/";
  private urlGetAllAccountByIdClient = environement.apiUrl + "/api/accounts";

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageErrorService: MessageErrorService
  ) { }

  getAccounts(idClient: string): Observable<Account[]> {
    return new Observable(subscriber => {
      this.http.post<Account[]>(this.urlGetAllAccountByIdClient, Number.parseInt(idClient)).subscribe({
        next: (value) => {
          subscriber.next(value);
        },
        error: (err) => {
          this.messageErrorService.setMessageError( {status: err.status,message: err.error} )
        }
      })
    })
  }

  transfert(dataForm: FormTransfert) {
    const body = JSON.parse(`{
      "creditorId": "${dataForm.receiverAccount}",
      "amount": "${dataForm.montant}"
    }
    `)
    this.http.put(this.urlTransfer + dataForm.emeteurAccount + "/transfer", body).subscribe({
      next: (value) => {
        this.messageErrorService.setMessageError({ status: null, message: "Le virement a bien été effectué" })
        this.router.navigateByUrl('/management/dashboard');
      },
      error: (err) => {
        this.messageErrorService.setMessageError( {status: err.status,message: err.error} )
      }
    })
  }

  getAudit(idAvisor:string|null): Observable<Audit> {
    return new Observable(subscriber => {
      if ( idAvisor==null) {
        this.http.get<Audit>(`${this.urlAudit}`).subscribe({
          next:(value)=>{
            subscriber.next(value);
          },
          error:(err)=>{
            this.messageErrorService.setMessageError( {status: err.status,message: err.error} )
          }
        });
      } else {
        this.http.post<Audit>(`${this.urlAudit}`,idAvisor).subscribe({
          next:(value)=>{
            subscriber.next(value);
          },
          error:(err)=>{
            this.messageErrorService.setMessageError( {status: err.status,message: err.error} )
          }
        });
      }
      
    })
  }
}
