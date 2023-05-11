import { Component, OnInit } from '@angular/core';
import { Audit } from '../../interface/audit';
import { AccountService } from 'src/app/service/account.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-audit-page',
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.css']
})

export class AuditPageComponent implements OnInit {
  sub: Subscription = new Subscription();
  user:User;
  audit: Audit;
  constructor(
    private accountService: AccountService,
    private userService:UserService
    ) {}

  ngOnInit(): void {
    this.sub=this.userService.currentUserObs$.subscribe((user:User)=>{
      this.user=user
      if(user.typeUser=="ADVISOR"){
        this.accountService.getAudit(user.user.id).subscribe((audit:Audit)=>this.audit=audit);
      }else{
        this.accountService.getAudit(null).subscribe((audit:Audit)=>this.audit=audit);
      }
    });
  }
}
