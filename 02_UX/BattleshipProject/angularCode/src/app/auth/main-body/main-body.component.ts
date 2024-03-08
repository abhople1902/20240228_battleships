import { Component } from '@angular/core';
import { SigninComponent } from '../input-login/signin/signin.component';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [SigninComponent
  ],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.css'
})
export class MainBodyComponent {

}
