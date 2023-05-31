import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConnectionComponent } from './form-connection.component';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AppModule } from '../app.module';

describe('FormConnectionComponent', () => {
  let component: FormConnectionComponent;
  let fixture: ComponentFixture<FormConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConnectionComponent ],
      imports:[AppModule,RouterModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
