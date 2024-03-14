import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './mainpage/content/content.component';
import { BodyComponent } from './mainpage/body/body.component';
import { ProfilemainComponent } from './profilemain/profilemain.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContentComponent,
    BodyComponent,
    NavbarComponent,
    MainBodyComponent,
    ProfilemainComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularCode';
}
