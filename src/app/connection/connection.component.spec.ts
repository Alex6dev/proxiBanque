import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionComponent } from './connection.component';
import { AppModule } from '../app.module';

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionComponent ],
      imports:[AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
