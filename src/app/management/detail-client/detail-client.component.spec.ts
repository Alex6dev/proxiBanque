import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientComponent } from './detail-client.component';
import { ManagementModule } from '../management.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ClientsService } from 'src/app/service/clients.service';
import { Client } from 'src/app/interface/client';
export class ClientsServiceMock{
  public getClientById(id:string):Client{
    return {
      id: "111",
      name: "nameTest",
      firstName: "firstNameTest",
      address: "addressTest",
      postcode: "postcodeTest",
      city: "cityTest",
      phone: "phoneTest",
    }
  }
}
describe('DetailClientComponent', () => {
  let component: DetailClientComponent;
  let fixture: ComponentFixture<DetailClientComponent>;
  let clientsService:ClientsService;

  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ DetailClientComponent ],
      imports:[ManagementModule],
      providers:[
        {
          provide:ActivatedRoute,
          useValue:{
            paramMap:of({idClient:"111"})
          }
        },{
          provide:ClientsService,
          useClass:ClientsServiceMock
        }
      ]
    });

    fixture = TestBed.createComponent(DetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    clientsService= TestBed.inject(ClientsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
