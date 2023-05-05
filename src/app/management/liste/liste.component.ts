import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from '../../interface/client';
import { ClientsService } from 'src/app/service/clients.service';
import { User } from 'src/app/interface/user';
import { UserService } from '../../service/user.service';
import { Advisor } from '../../interface/user';
import { AdvisorsService } from 'src/app/service/advisors.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {
  sub:Subscription = new Subscription();
  sub2:Subscription = new Subscription();
  clients:Client[] = [];
  advisors:Advisor[]=[];
  userCurrent:User={user: null,typeUser:null};
  
  constructor(
    private clientsService: ClientsService,
    private userService:UserService,
    private advisorService:AdvisorsService
  ){}


  ngOnInit(){
    
    this.sub=this.userService.currentUserObs$.subscribe((user:User)=>{
      this.userCurrent=user
      if(user.typeUser=="ADVISOR"){
        this.sub2 = this.clientsService.currentClientsObs$.subscribe(listeClient =>{
          this.clients = listeClient;
        })
      }else{
        this.sub2=this.advisorService.advisorsObs$.subscribe(listAdvisors=>{
          this.advisors=listAdvisors;
        })
      }
    })
}

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  

}
