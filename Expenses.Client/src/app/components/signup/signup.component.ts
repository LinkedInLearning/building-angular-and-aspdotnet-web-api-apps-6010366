import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: this.passwordMatchValidator
      }
    )
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }

  passwordMatchValidator(fg: FormGroup){
    return fg.get('password')?.value === fg.get('confirmPassword')?.value
    ? null
    : {passwordMismatch: true}
  }

  onSubmit():void{

    this.errorMessage = null;

    if(this.signupForm.valid){
      const signUp = this.signupForm.value;
      this.authService.register(signUp).subscribe({
        next: () => {
          this.router.navigate(['/transactions'])
        },
        error: (error) => {
          console.log('Error - ', error);
          this.errorMessage = error.error?.message || 'An error occurred during signup. Please, try again.'
        }
      })
    }

  }

}
