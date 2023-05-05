import { Component } from '@angular/core';
import { FormGroup ,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.css']
})
export class FormConnectionComponent {
  signupForm: FormGroup=new FormGroup({
    identifiant: new FormControl(null, Validators.required),
    mdp: new FormControl(null, Validators.required)
  })
  constructor(private authService:AuthService, private router:Router){}
  
  onSubmit(){
    if(this.signupForm.valid){ 
      this.authService.authentification(this.signupForm.value,true)
    }
  }
}
