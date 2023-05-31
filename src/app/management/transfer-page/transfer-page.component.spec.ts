import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPageComponent } from './transfer-page.component';
import { ManagementModule } from '../management.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TransferPageComponent', () => {
  let component: TransferPageComponent;
  let fixture: ComponentFixture<TransferPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPageComponent ],
      imports:[ManagementModule],
      providers:[{
        provide:ActivatedRoute,
        useValue:{
          paramMap:of({idClient:"111"})
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
