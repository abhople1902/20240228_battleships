import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signupForm: FormGroup;

  /**
   * Constructor
   *
   * Initializes the signup form with validators for username, email, and password fields.
   * @param formBuilder FormBuilder instance for creating the form group
   */
  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],

      password: ['', [Validators.required]],
    });
  }

  /**
   * onSubmit
   *
   * Handles form submission.
   * Logs success message if the form is valid, otherwise logs error message.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  /**
   * showAlert
   *
   * Displays an alert if the form is invalid.
   */
  showAlert() {
    if (this.signupForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
