import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientComponent } from './update-client.component';
import { ManagementModule } from '../management.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateClientComponent', () => {
  let component: UpdateClientComponent;
  let fixture: ComponentFixture<UpdateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClientComponent ],
      imports:[ManagementModule],
      providers:[{
        provide:ActivatedRoute,
        useValue:{
          paramMap:of({idClient:111})
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
