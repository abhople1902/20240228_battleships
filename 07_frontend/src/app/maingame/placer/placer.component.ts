import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-placer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './placer.component.html',
  styleUrl: './placer.component.css',
})
export class PlacerComponent {
  cells: { row: number; col: number }[] = [];
  shipsIndex = new Set<{ row: number; col: number }>();

  constructor(private router: Router) {}

  ngOnInit() {
    for (let row = 1; row <= 8; row++) {
      for (let col = 1; col <= 8; col++) {
        this.cells.push({ row, col });
      }
    }
  }

  showIndex(cell: { row: number; col: number }) {
    // alert(`Index: ${cell.row}, ${cell.col}`);
    const index = cell;
    if (!this.shipsIndex.has(index)) {
      this.shipsIndex.add(index);
      alert(`Placed a ship at ${cell.row}, ${cell.col}`);
      if (this.shipsIndex.size === 5) {
        alert('You have placed all your ships!');
      }
    } else {
      alert(`Already a ship at ${cell.row}, ${cell.col}`);
    }
  }

  navigateToGame() {
    if (this.shipsIndex.size === 5) {
      this.router.navigate(['/game']);
    } else {
      alert('Place all your ships first!');
    }
  }
}
