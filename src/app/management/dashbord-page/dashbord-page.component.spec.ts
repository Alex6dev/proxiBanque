import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPageComponent } from './dashbord-page.component';
import { ManagementModule } from '../management.module';

describe('DashbordPageComponent', () => {
  let component: DashbordPageComponent;
  let fixture: ComponentFixture<DashbordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordPageComponent ],
      imports:[ManagementModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
