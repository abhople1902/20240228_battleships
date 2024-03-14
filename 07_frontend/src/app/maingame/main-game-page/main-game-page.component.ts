import { Component, ViewChildren, QueryList } from '@angular/core';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-main-game-page',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './main-game-page.component.html',
  styleUrl: './main-game-page.component.css',
})
export class MainGamePageComponent {

  readonly humanScore = 3
  readonly computerScore = 2
  readonly totalScore = 5

  currentTurn: 'Human' | 'Computer' = 'Human';

  constructor() {
    // Hardcoded indices for the ship
  }

  @ViewChildren(GridComponent) gridComponents!: QueryList<GridComponent>;

  handleIndexClicked(cell: { row: number; col: number }) {
    // console.log(`Index clicked in parent component: ${cell.row}, ${cell.col}`);
    // alert(`Index: ${cell.row}, ${cell.col}`);

    let shipIsHit = false

    // Logic for checking the index
    if (!this.checkIndex(cell.row, cell.col)) {
      alert('Not a ship.');
      shipIsHit = false
    } else {
      alert('Ship found!');
      shipIsHit = true
    }

    // Logic for changing turns
    if (this.currentTurn === 'Human') {
      // Get the Grid Component for Human
      const gridComponent = this.gridComponents.toArray()[1]

      // Handle it being a hit
      if (shipIsHit) {
        gridComponent.makeShipHit(cell)
      }
      else {
        this.currentTurn = 'Computer';
        this.makeBotMove();
      }
    } else {
      const gridComponent = this.gridComponents.toArray()[0]

      // Handle it being a hit
      if (shipIsHit) {
        gridComponent.makeShipHit(cell)
      }
      else {
        this.currentTurn = 'Human';
      }
    }
  }

  /** Responsible for making the bot's move */
  makeBotMove() {
    // Wait for 3 seconds before bot makes a move
    setTimeout(() => {
      // Logic for bot to make a move
      const botGridComponent = this.gridComponents.toArray()[0];

      // Iteratively check for a move and make it if it's valid
      while (true) {
        const row = Math.floor(Math.random() * 8) + 1;
        const col = Math.floor(Math.random() * 8) + 1;
        if (!botGridComponent.isButtonDisabled({ row, col })) {
          botGridComponent.makeAMove(row, col);
          break;
        }
      }
    }, 3000);
  }

  /** Placeholder for the API call. */
  checkIndex(row: number, col: number) {
    
    return true;
  }
}
