import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/interface/account';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACCESS_TOKEN_ID } from 'src/app/service/user.service';
import { MessageErrorService } from '../../message-error.service';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent {
  sub: Subscription= new Subscription();
  transferForm:FormGroup;
  userId:string="";
  accounts:Account[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService:AccountService,
    private messageErrorService:MessageErrorService
    ){}

  ngOnInit():void{
    this.userId=window.sessionStorage.getItem(ACCESS_TOKEN_ID);
    this.activatedRoute.paramMap.subscribe({
      next: (p:ParamMap) => {
        if (p.get('idCompte')!=null) {
          this.userId=p.get('idCompte');
          this.transferForm=new FormGroup({
            emeteurAccount:new FormControl(p.get("idCompte"),[Validators.min(0),Validators.required,Validators.pattern('[0-9]*')]),
            receiverAccount: new FormControl(null,[Validators.min(0),Validators.required,Validators.pattern('[0-9]*')]),
            montant: new FormControl(null,[Validators.min(0),Validators.required,Validators.pattern('[0-9]*')])
          })

        }else{
          this.transferForm=new FormGroup({
            emeteurAccount:new FormControl(null,[Validators.min(0),Validators.required,Validators.pattern('[0-9]*')]),
            receiverAccount: new FormControl(null,[Validators.min(0),Validators.required,Validators.pattern('[0-9]*')]),
            montant: new FormControl(null,[Validators.min(0),Validators.required,Validators.pattern('[0-9]*')])
          })
        }
      },
    })

  }
  submitFormTransfert():void{
    if(this.transferForm.valid) {
      if(confirm(`
        Voulez-vous effectuer un virement d'un montant de ${this.transferForm.value.montant} euros
        du compte : ${this.transferForm.value.emeteurAccount} ,
        vers le compte : ${this.transferForm.value.receiverAccount} ?      
      `
      ))
        this.accountService.transfert({
          emeteurAccount:this.transferForm.value.emeteurAccount,
          receiverAccount: this.transferForm.value.receiverAccount,
          montant: this.transferForm.value.montant
      });
    }else{
      this.messageErrorService.setMessageError({ status:null,
        message:"Le numéro du compte émetteur et celui du compte bénéficiaire sont obligatoires et le montant doit être positif"})
    }
  }
 
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
