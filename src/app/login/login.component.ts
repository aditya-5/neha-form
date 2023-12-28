import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  forbiddenNames = ['admin', 'Admin'];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private backendService: BackendService) {}


   clearMessage() {
    this.successMessage = null;
    this.errorMessage = null;
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [
        Validators.required,
        this.forbiddenUsernames.bind(this)
      ]),
      'password': new FormControl(null, Validators.required)
    });
  
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Data: ', this.loginForm.value);
      this.backendService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            // Handle success response
            this.successMessage = 'Login successful!';
            this.errorMessage = null;
          },
          error: (error) => {
            // Handle error response
            this.errorMessage = 'Failed to login. Please try again.';
            this.successMessage = null;
          }
        });

    }
  }


  forbiddenUsernames(control: FormControl): {[s: string]: boolean}| null {
    if (this.forbiddenNames.includes(control.value)) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

}
