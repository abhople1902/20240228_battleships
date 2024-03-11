import { Component } from '@angular/core';

@Component({
  selector: 'app-placer',
  standalone: true,
  imports: [],
  templateUrl: './placer.component.html',
  styleUrl: './placer.component.css'
})
export class PlacerComponent {
  ngOnInit(): void{
    document.addEventListener('DOMContentLoaded', function() {
      const gridContainer1 = document.getElementById('grid-container-1');
  
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
  
              box1.appendChild(button1);
              gridContainer1?.appendChild(box1)
          }
      }
  });
  
  }
}
