import { Component, OnInit } from '@angular/core';
import { Audit } from '../../interface/audit';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-audit-page',
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.css']
})

export class AuditPageComponent implements OnInit {
  
  audit: Audit;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAudit().subscribe((data: Audit) => {
      this.audit = data;
    });
  }
}
