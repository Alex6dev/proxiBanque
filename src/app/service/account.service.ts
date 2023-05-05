import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../interface/account';
import { FormTransfert } from '../interface/form';
import { Router } from '@angular/router';
import { MessageErrorService } from '../message-error.service';
import { Audit } from '../interface/audit';
import { User } from 'src/app/interface/user';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { environement } from 'src/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:8080/api/accounts/audit";
  private urlTransfer = environement.apiUrl + "/api/account/";
  private urlGetAllAccountByIdClient = environement.apiUrl + "/api/accounts";
  isManager: boolean;
  currentAdvisorId: number;
  sub: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private userService: UserService,
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
          this.messageErrorService.setMessageError({
            status: err.status,
            message: err.error
          })
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
        this.messageErrorService.setMessageError({
          status: err.status,
          message: err.error
        })
      }
    })
  }

  getAudit(): Observable<Audit> {
    this.sub = this.userService.currentUserObs$.subscribe((user: User) => {
      if (user.typeUser == "ADVISOR") {
        this.currentAdvisorId = Number(user.user.id);
      } else {
        this.currentAdvisorId = -1;
      }
    })
    if (this.currentAdvisorId < 0) {
      return this.http.get<Audit>(`${this.baseUrl}`);
    } else {
      return this.http.post<Audit>(`${this.baseUrl}`, this.currentAdvisorId);
    }
  }
}
