import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profilemain',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule],
  templateUrl: './profilemain.component.html',
  styleUrl: './profilemain.component.css',
  providers: [AuthService],
})
export class ProfilemainComponent implements OnInit {
  userName = "Username";
  playerUsername: string = "Binod/ Rajat dalal"
  matchesPlayed: number = 10
  matchesWon: number = 5
  matchesLoss: number = 5
  WinningPer: Number = 50

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.request('GET', `user/getUserStats`).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
        this.playerUsername = response.body.username
        this.matchesWon = response.body.gameWon
        this.matchesPlayed = response.body.totalGamesPlayed
        this.matchesLoss = this.matchesPlayed - this.matchesWon
        this.WinningPer=Math.floor(this.matchesWon/this.matchesPlayed *100)
      },
      (error) => {
        console.error(error)
      }
    );
  }
}
