import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-placer',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './placer.component.html',
  styleUrl: './placer.component.css',
  providers: [AuthService]
})
export class PlacerComponent {
  cells: { row: number; col: number }[] = [];
  // shipsIndex = new Set<{ row: number; col: number }>();
  shipPlacements: Array<Array<boolean>> = []

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    for (let row = 1; row <= 8; row++) {
      const tempArrayOfFalses: Array<boolean> = []
      for (let col = 1; col <= 8; col++) {
        this.cells.push({ row, col });
        tempArrayOfFalses.push(false)
      }
      this.shipPlacements.push(tempArrayOfFalses)
    }
  }

  handleClick(cell: { row: number; col: number }) {
    // alert(`Index: ${cell.row}, ${cell.col}`);

    if (this.shipPlacements[cell.row - 1][cell.col - 1]) {
      this.shipPlacements[cell.row - 1][cell.col - 1] = false
    }
    else if (this.countPlacedShips() >= 5) {
      alert('You have placed all your ships!');
      return
    }
    else {
      this.shipPlacements[cell.row - 1][cell.col - 1] = true
    }
  }

  navigateToGame() {
    if (this.countPlacedShips() >= 5) {
      this.saveData((gameId: string) => {
        this.router.navigate(['/game/' + gameId]);
      })
    } else {
      alert('Place all your ships first!');
    }
  }

  countPlacedShips(): number {
    let count = 0
    for (let i = 0; i < this.shipPlacements.length; i++) {
      const tempArray = this.shipPlacements[i]
      for (let j = 0; j < tempArray.length; j++) {
        if (tempArray[j]) {
          count++
        }
      }
    }
    return count
  }

  /** Saving the ships data */
  saveData(moveOn: Function) {
    const dataToBeSent = {
      gameId: "65f16f48e2b178136bf3ca78",
      position: this.getShipPlacementsJson(),
      shipType: "Carriers"
    }
    console.log("Here!")
    this.authService.request('POST', 'game/place-ship', dataToBeSent)
      .subscribe(
        (response) => {
          console.log(response)
          moveOn("65f16f48e2b178136bf3ca78")
        },
        (error) => {

        }
      )
  }

  getShipPlacementsJson(): { x: number, y: number }[] {
    const outputArray: { x: number, y: number }[] = []

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.shipPlacements[i][j]) {
          const objectToBeAdded = {
            x: i,
            y: j
          }

          outputArray.push(objectToBeAdded)
        }
      }
    }

    return outputArray
  }
}
