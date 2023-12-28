import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BackendService } from '../backend.service'; 
import { Subject } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  profileForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  user = new Subject<User>();

   clearMessage() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  constructor(private backendService: BackendService) {}

   ngOnInit(): void {
    this.profileForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'username': new FormControl('', [Validators.required, this.checkUsername]),
      'password': new FormControl('password123$', [Validators.required, this.checkPassword]),
      'confirmPassword': new FormControl('password123$', Validators.required)
    }, { validators: this.passwordMatchValidator });

    this.backendService.user.subscribe(user => {
      if (user) {
        console.log(user)
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username
        });
      }
    });

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

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSave() {
    if (this.profileForm.valid) {
      this.backendService.saveData(this.profileForm.value)
        .subscribe({
          next: (response) => {
            // Handle success response
            this.successMessage = 'Profile updated successfully!';
            this.errorMessage = null;
          },
          error: (error) => {
            // Handle error response
            this.errorMessage = 'Failed to update profile. Please try again.';
            this.successMessage = null;
          }
        });
    }
  }


}
