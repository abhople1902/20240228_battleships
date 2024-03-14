import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  // TODO: Make this 3 into 1 using codes (0 / 1 / -1)
  isClicked: Array<Array<boolean>> = []
  isAShip: Array<Array<boolean>> = []
  cells: { row: number; col: number }[] = [];

  @Output() indexClicked = new EventEmitter<{ row: number; col: number }>();

  constructor() {
    // Initialize the 8x8 grid, and the grid of being clicked or hit
    // TODO: Fetch this 8 from database
    for (let row = 1; row <= 8; row++) {
      const tempArrayOfFalses: Array<boolean> = []
      for (let col = 1; col <= 8; col++) {
        this.cells.push({ row, col });
        tempArrayOfFalses.push(false)
      }
      this.isClicked.push(tempArrayOfFalses)
    }
    // Best method to create a deep copy of an array.
    this.isAShip = JSON.parse(JSON.stringify(this.isClicked))
  }

  /** Handles the event when a tile is clicked */
  handleClick(cell: { row: number; col: number }) {
    if (this.isButtonDisabled(cell)) {
      alert("Already played there!")
      return
    }
    if (!this.isClicked[cell.row][cell.col]) {
      this.indexClicked.emit(cell);
      this.isClicked[cell.row - 1][cell.col - 1] = true
    }
  }

  /** Helper (called by parent) to make the move of the bot. */
  makeAMove(row: number, col: number) {
    alert(`Bot made a move at ${row}, ${col}`);
    this.handleClick({ row, col });
  }

  /** Helper to check if a tile has already been played on */
  isButtonDisabled(cell: { row: number, col: number }) {
    return this.isClicked[cell.row - 1][cell.col - 1];
  }

  /** Helper to change the status of a tile to hit */
  makeShipHit(cell: { row: number, col: number }) {
    this.isAShip[cell.row - 1][cell.col - 1] = true;
  }
}
