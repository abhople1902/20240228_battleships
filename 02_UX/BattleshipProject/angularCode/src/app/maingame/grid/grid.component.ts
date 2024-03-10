import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  ngOnInit(): void{
    document.addEventListener('DOMContentLoaded', function() {
      const gridContainer1 = document.getElementById('grid-container-1');
      const gridContainer2 = document.getElementById('grid-container-2');
  
      for (let row = 1; row <= 8; row++) {
          for (let col = 1; col <= 8; col++) {
              const box1 = document.createElement('div');
              box1.classList.add('box');
  
              const button1 = document.createElement('button');
              button1.classList.add('button');
              button1.textContent = `${row}, ${col}`;
              button1.onclick = function() {
                  alert(`Index: ${row}, ${col}`);
              };
  
              const box2 = document.createElement('div');
              box2.classList.add('box');
  
              const button2 = document.createElement('button');
              button2.classList.add('button');
              button2.textContent = `${row}, ${col}`;
              button2.onclick = function() {
                  alert(`Index: ${row}, ${col}`);
              };
  
              box1.appendChild(button1);
              // gridContainer1.appendChild(box1);
              gridContainer1?.appendChild(box1)
  
              box2.appendChild(button2);
              gridContainer2?.appendChild(box2);
          }
      }
  });
  
  }
}
