import { Component } from '@angular/core';
import { BodyComponent } from '../../components/body/body.component';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-rulespage',
  standalone: true,
  imports: [BodyComponent, ContentComponent],
  templateUrl: './rulespage.component.html',
  styleUrl: './rulespage.component.css'
})
export class RulespageComponent {

}
