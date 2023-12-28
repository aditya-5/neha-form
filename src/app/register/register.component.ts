import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;


   clearMessage() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  constructor(private backendService: BackendService, private router:Router) {}


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'username': new FormControl(null, [Validators.required,this.checkUsername.bind(this)]),
      'password': new FormControl(null, [Validators.required,this.checkPassword.bind(this)]),
      'confirmPassword': new FormControl(null, Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  checkUsername(control: FormControl): {[s: string]: boolean}| null {
    const usernameRegex = /^[A-Za-z0-9]+$/;
    const value = control.value || '';
    if (!usernameRegex.test(value) || value.length < 3) {
      return { 'usernameInvalid': true };
    }
    return null; 
  }

  checkPassword(control: FormControl): {[s: string]: boolean}| null {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const value = control.value || '';

    if (value.length < 6 || !specialCharRegex.test(value)) {
      return { 'passwordInvalid': true };
    }
    return null; 
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data: ', this.registerForm.value);
      this.backendService.register(this.registerForm.value)
        .subscribe({
          next: (response) => {
            // Handle success response
            this.successMessage = 'Registration successful!';
            this.errorMessage = null;
            this.router.navigate(['/account'])
          },
          error: (error) => {
            // Handle error response
            this.errorMessage = 'Failed to register profile. Please try again.';
            this.successMessage = null;
          }
        });

    }
  }


}
