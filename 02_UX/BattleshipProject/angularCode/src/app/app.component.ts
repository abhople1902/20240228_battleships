import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainBodyComponent } from './auth/main-body/main-body.component';
import { NavbarComponent } from './auth/navbar/navbar.component';
import { NavBarComponent } from './mainpage/nav-bar/nav-bar.component';
import { ContentComponent } from './mainpage/content/content.component';
import { BodyComponent } from './mainpage/body/body.component';
// import { NavBarComponent } from './mainpage/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent, ContentComponent, BodyComponent,NavbarComponent,MainBodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularCode';
}
