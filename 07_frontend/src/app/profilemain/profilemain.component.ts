import { Component } from '@angular/core';

@Component({
  selector: 'app-profilemain',
  standalone: true,
  imports: [],
  templateUrl: './profilemain.component.html',
  styleUrl: './profilemain.component.css'
})
export class ProfilemainComponent {
  userName = "Username";
  playerUsername: string = "Binod/ Rajat dalal"
  matchesPlayed: number = 10
  matchesWon: number = 5
  matchesLoss: number = 5
  WinningPer: Number = 50
}
