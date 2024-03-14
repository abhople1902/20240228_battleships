import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  providers: [AuthService]
})
export class SigninComponent {
  signupForm: FormGroup;
  username: string = '';
  password: string = '';
  // apiUrl: string = 'http://localhost:3000/auth/signin'; 


  /**
   * Constructor
   *
   * Initializes the signup form with validators for username, email, and password fields.
   * @param formBuilder FormBuilder instance for creating the form group
   */
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
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
    console.log("submit button is press")
    console.log('Form submitted successfully!');
    const userData = {
      username: this.username,
      password: this.password
    }
    this.http.post<any>('http://localhost:3000/auth/signin', userData).subscribe({
      next: async (response) => {
        console.log("Login Successful", response)
        // Store token in localStorage or sessionStorage
        // const data = await response.json()
        const token = response.token;
        this.authService.setToken(token);
        this.router.navigate(['/shipplacer'])
      },
      error: (error) => {

        console.error('Login Fail', error)
      }


    })
  }
  // onSubmit() {
  //   if (this.username && this.password) {
  //     console.log('Form submitted successfully!');
  //     // Make HTTP POST request using Fetch API
  //     fetch(this.apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username: this.username,
  //         password: this.password,
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // Handle successful login
  //         console.log('Login successful:', data);
  //         // Store token in localStorage or sessionStorage
  //         localStorage.setItem('token', data.token); // Change 'token' to match your API response
  //       })
  //       .catch((error) => {
  //         console.error('Login failed: ', error);
  //         // Handle login error
  //       });
  //   } else {
  //     console.log('Form is invalid. Please fill all fields.');
  //   }
  // }

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
