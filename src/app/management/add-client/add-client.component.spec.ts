import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientComponent } from './add-client.component';
import { ManagementModule } from '../management.module';

describe('AddClientComponent', () => {
  let component: AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientComponent ],
      imports:[ManagementModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
