import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() loggedInUserData: EventEmitter<string> = new EventEmitter<string>();

  
  loginForm!: FormGroup;
  showLoginWindow: boolean = true;
  loginError: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ){}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })
  }

  toggleLoginWindow() {
    this.showLoginWindow = !this.showLoginWindow;
  }

  loginUser(){
    const loginData = this.loginForm?.value;
    if(loginData.email && loginData.password){
      this.sharedService.loginUser(loginData.email, loginData.password)
      .subscribe((response: any) => {
        if(response){
          console.log('LoggedIn', response);
          this.loginError = true;
          this.showLoginWindow = false;
          this.updateUser(response?.user);
          this.handleToken(response.token, response?.user);
        }
      },
      error =>{
        this.loginError = true;
        console.log(error);
      });
    }else{
      this.loginError = true;
    }
  }

  updateUser(user: any){
    this.loggedInUserData.emit(user);
  }

  handleToken(tokenData: string, userData: any){
    const loggedInUser = { name: userData.name, token: tokenData };
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  }
}
