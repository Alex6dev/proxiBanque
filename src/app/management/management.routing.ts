import { RouterModule, Routes } from "@angular/router";
import { DashbordPageComponent } from "./dashbord-page/dashbord-page.component";
import { TransferPageComponent } from "./transfer-page/transfer-page.component";
import { AuditPageComponent } from "./audit-page/audit-page.component";
import { DetailClientComponent } from "./detail-client/detail-client.component";
import { UpdateClientComponent } from "./update-client/update-client.component";
import { AddClientComponent } from "./add-client/add-client.component";
import { AddLoanComponent } from "./add-loan/add-loan.component";

const managementRoutes:Routes=[
    
    { path:"dashboard",component:DashbordPageComponent},
    { path:"transfer/:idCompte",component:TransferPageComponent},
    { path:"transfer",component:TransferPageComponent},
    { path:"audit",component:AuditPageComponent},
    { path:"client/addClient",component:AddClientComponent},
    { path:"client/:idClient", component:DetailClientComponent},
    { path:"client/:idClient/edit", component:UpdateClientComponent},
    { path:"addLoan/:idClient", component:AddLoanComponent},
    { path: '**', redirectTo:'not-found' }

]

export const MANAGEMENT_ROUTING= RouterModule.forChild(managementRoutes);