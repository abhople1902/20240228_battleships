import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }
}

@Component({
  selector: 'app-regiter',
  standalone: true,
  imports: [

    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,


  ],

  templateUrl: './regiter.component.html',
  styleUrl: './regiter.component.css'
})

export class RegiterComponent {
  constructor() { }

  onLogin(): void {
    // Fetch call to your API
    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'keshav9282',
        password: 'kasjkahsa',
        email: 'abcd@gmail.net'
      })
    })
      .then(response => {
        console.log(response)
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        // Handle successful login response
      })
      .catch(error => {
        console.error('Login failed: ', error);
        // Handle login error
      });
  }
}
