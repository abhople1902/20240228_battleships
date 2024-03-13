import { Component, Output } from '@angular/core';
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
  cells: { row: number; col: number }[] = [];
  clickedIndices = new Set<{ row: number; col: number }>();
  successfulHits = new Set<{ row: number; col: number }>();

  @Output() indexClicked = new EventEmitter<{ row: number; col: number }>();

  ngOnInit() {
    for (let row = 1; row <= 8; row++) {
      for (let col = 1; col <= 8; col++) {
        this.cells.push({ row, col });
      }
    }
  }

  showIndex(cell: { row: number; col: number }) {
    const index = cell;
    if (!this.clickedIndices.has(index)) {
      this.clickedIndices.add(index);
      this.indexClicked.emit(cell);
    }

    // Logging clicked indices for now.
    console.log(this.clickedIndices);
  }

  makeAMove(row: number, col: number) {
    alert(`Bot made a move at ${row}, ${col}`);
    this.showIndex({ row, col });
  }

  isButtonDisabled(row: number, col: number) {
    const index = { row, col };
    return this.clickedIndices.has(index);
  }

  isAHit(row: number, col: number) {
    const index = { row, col };
    return this.successfulHits.has(index);
  }
}
