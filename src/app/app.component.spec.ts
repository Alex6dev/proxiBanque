import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './service/auth.service';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let app:AppComponent;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule
      ],
      declarations: [
        AppComponent
      ],
    });
    fixture=TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  it(`should have as title 'proxibanque'`, () => {

    expect(app.title).toEqual('proxibanque');
  });

});
