import { Component, ViewChildren, QueryList } from '@angular/core';
import { GridComponent } from '../maingame/grid/grid.component';

@Component({
  selector: 'app-main-game-page',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './main-game-page.component.html',
  styleUrl: './main-game-page.component.css',
})
export class MainGamePageComponent {
  currentTurn: 'Human' | 'Computer' = 'Human';
  temporaryIndices = new Set<{ row: number; col: number }>();

  constructor() {
    // Hardcoded indices for the ship
    this.temporaryIndices.add({ row: 1, col: 1 });
    this.temporaryIndices.add({ row: 2, col: 2 });
    this.temporaryIndices.add({ row: 3, col: 3 });
    this.temporaryIndices.add({ row: 4, col: 4 });
    this.temporaryIndices.add({ row: 5, col: 5 });
    this.temporaryIndices.add({ row: 6, col: 6 });
    this.temporaryIndices.add({ row: 7, col: 7 });
    this.temporaryIndices.add({ row: 8, col: 8 });
  }

  @ViewChildren(GridComponent) gridComponents!: QueryList<GridComponent>;

  handleIndexClicked(cell: { row: number; col: number }) {
    // console.log(`Index clicked in parent component: ${cell.row}, ${cell.col}`);
    // alert(`Index: ${cell.row}, ${cell.col}`);

    // Logic for checking the index
    if (!this.checkIndex(cell.row, cell.col)) {
      alert('Not a ship.');
    } else {
      alert('Ship found!');
    }

    // Logic for changing turns
    if (this.currentTurn === 'Human') {
      this.currentTurn = 'Computer';
      this.makeBotMove();
    } else {
      this.currentTurn = 'Human';
    }
  }

  /** Responsible for making the bot's move */
  makeBotMove() {
    // Wait for 3 seconds before bot makes a move
    setTimeout(() => {
      // Logic for bot to make a move
      const botGridComponent = this.gridComponents.toArray()[0];

      // Iteratively check for a move and make it if it's valid
      // while (true) {
      const row = Math.floor(Math.random() * 8) + 1;
      const col = Math.floor(Math.random() * 8) + 1;
      // if (!botGridComponent.isButtonDisabled(row, col)) {
      botGridComponent.makeAMove(row, col);
      //   break;
      // }
      // }
    }, 3000);
  }

  /** Placeholder for the API call. */
  checkIndex(row: number, col: number) {
    const exists = [...this.temporaryIndices].some(
      (obj) => obj.row === row && obj.col === col
    );

    console.log(exists); // Output: true
    return exists;
  }
}
