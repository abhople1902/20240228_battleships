import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
  providers: [AuthService],
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetInstructionsSent: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log('clicked');
    if (this.forgotPasswordForm.valid) {
      const email = this.getEmail()?.value;
      this.authService
        .request('POST', `auth/forget-password`, { email })
        .subscribe(
          (response) => {
            console.log(response);
            this.resetInstructionsSent = true;
          },
          (error) => {
            console.error('Error sending reset instructions:', error);
            if (error.status === 400) {
              this.errorMessage = 'Invalid email format';
            } else if (error.status === 404) {
              this.errorMessage = 'Invalid Email';
            } else {
              this.errorMessage =
                'An unexpected error occurred. Please try again.';
            }
          }
        );
    }
  }

  getEmail(): AbstractControl<any, any> | null {
    return this.forgotPasswordForm.get('email');
  }
}
