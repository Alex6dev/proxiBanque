import { Component} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Account } from 'src/app/interface/account';
import { Client } from 'src/app/interface/client';
import { LoanService } from 'src/app/service/loan.service';
import { Subscription } from 'rxjs';
import { Loan } from 'src/app/interface/loan';
import { ClientsService } from 'src/app/service/clients.service';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent {
  sub:Subscription=new Subscription;
  oneClient: Client;
  accountsClient:Account[]=[];
  loans:Loan[]=[];
  constructor(
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService:AccountService,
    private loanService:LoanService
    ) { 
    
  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
      next: (p:ParamMap) => {
        const id= p.get('idClient');
        this.oneClient = this.clientsService.getClientById(id);
        this.accountService.getAccounts(id).subscribe(accounts=>{
          this.accountsClient=accounts;
        });
        this.loanService.getAllLoanByIdClient(id);
        this.sub=this.loanService.currentLoansObs$.subscribe((loansObs:Loan[])=>{
          this.loans=loansObs;
        })
        
      },
    })
  }

  deleteClient(){
    if(confirm("Voulez-vous supprimer ce client?")){
      this.clientsService.deleteClient(this.oneClient.id);
      this.router.navigateByUrl('/management/dashboard');
    }
  }
  acceptLoan(loan:Loan){
    if(confirm("Voulez-vous vraiment accepter le prêt: "+loan.id+" d'un montant de "+loan.initialAmount+" pour la durée de :" +loan.duration / 2629800000+ "mois pour votre client ?"))
      this.loanService.acceptLoan({loan:loan,idClient:Number.parseInt(this.oneClient.id)});
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

}


  
