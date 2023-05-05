import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordPageComponent } from './dashbord-page/dashbord-page.component';
import { TransferPageComponent } from './transfer-page/transfer-page.component';
import { AuditPageComponent } from './audit-page/audit-page.component';
import { MANAGEMENT_ROUTING } from './management.routing';
import { ListeComponent } from './liste/liste.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import {  HttpClientModule } from '@angular/common/http';
import { UpdateClientComponent } from './update-client/update-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './add-client/add-client.component';
import { AddLoanComponent } from './add-loan/add-loan.component';




@NgModule({
  declarations: [
    DashbordPageComponent,
    TransferPageComponent,
    AuditPageComponent,
    ListeComponent,
    DetailClientComponent,
    UpdateClientComponent,
    AddClientComponent,
    AddLoanComponent

  ],
  imports: [
    CommonModule,MANAGEMENT_ROUTING, HttpClientModule, FormsModule, ReactiveFormsModule
  ]
})
export class ManagementModule { }
