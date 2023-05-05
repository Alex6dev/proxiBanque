import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsConnectedGuard } from './guard/is-connected.guard';
import { ConnectionComponent } from './connection/connection.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path:'management',
    canActivate:[IsConnectedGuard],
    loadChildren:()=>import('./management/management.module').then(m => m.ManagementModule) 
  },
  { path:'', component:ConnectionComponent},
  { path: "not-found", component:NotFoundComponent},
  { path: '**', redirectTo:'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
