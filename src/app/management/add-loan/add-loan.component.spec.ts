import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanComponent } from './add-loan.component';
import { ManagementModule } from '../management.module';
import { ActivatedRoute, RouterModule, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AddLoanComponent', () => {
  let component: AddLoanComponent;
  let fixture: ComponentFixture<AddLoanComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanComponent ],
      imports:[
        ManagementModule,
        RouterTestingModule],
      providers:[{
        provide:ActivatedRoute,
        useValue:{
          paramMap:of({idClient:111})
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
