import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor(
    private userService:UserService,
    private router: Router
  ){}

  retour():void{
    this.userService.isPresentTokenInSession()?this.router.navigateByUrl('/management/dashboard'):this.router.navigateByUrl("/");
  }
}
