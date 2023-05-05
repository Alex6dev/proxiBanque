import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoanService } from '../../service/loan.service';
import { MessageErrorService } from '../../message-error.service';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent {
  idClient:string;
  newLoan:FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loanService:LoanService,
    private messageErrorService:MessageErrorService

  ){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
      next:(p:ParamMap)=>{
        this.idClient=p.get('idClient');
      }
    })
    this.newLoan=new FormGroup({
      initialAmount:new FormControl(null, [Validators.required,Validators.pattern('[0-9]*'),Validators.min(1)]),
      duration:new FormControl(null, [Validators.required,Validators.pattern('[0-9]*'),Validators.min(1)]),
      interestRate:new FormControl(null, [Validators.required,Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]),
      insuranceRate:new FormControl(null, [Validators.required,Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]),
    })
  }

  quoteSend(){
    if(this.newLoan.valid)
      this.loanService.quoteSend(this.newLoan,this.idClient);
    else{
      this.messageErrorService.setMessageError({status:null,message:"Merci de remplir les différents champs avec des chiffres corrects"})
    }
  }
}
