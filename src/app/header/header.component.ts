import { Component } from '@angular/core';
import { User } from '../interface/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sub: Subscription = new Subscription();
  user:User={user: null,typeUser:null};
  constructor(private userService: UserService, private router: Router){}

  ngOnInit():void{
    this.sub=this.userService.currentUserObs$.subscribe((user:User)=>{
      this.user=user;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

  logout():void{    
    this.userService.logout();
    this.router.navigateByUrl('/')
  }

}
