import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { ContentComponent } from '../content/content.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BodyComponent, ContentComponent, NavBarComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
