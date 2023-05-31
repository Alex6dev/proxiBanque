import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPageComponent } from './audit-page.component';
import { ManagementModule } from '../management.module';

describe('AuditPageComponent', () => {
  let component: AuditPageComponent;
  let fixture: ComponentFixture<AuditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditPageComponent ],
      imports:[ManagementModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
