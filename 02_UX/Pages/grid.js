document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');

    for (let row = 1; row <= 8; row++) {
        for (let col = 1; col <= 8; col++) {
            const box = document.createElement('div');
            box.classList.add('box');

            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = `${row}, ${col}`;
            button.onclick = function() {
                alert(`Index: ${row}, ${col}`);
            };
            box.appendChild(button);
            gridContainer.appendChild(box);
        }
    }
});
// document.addEventListener('DOMContentLoaded', function() {
//     const gridContainer = document.getElementById('grid-container');

//     for (let row = 1; row <= 8; row++) {
//         for (let col = 1; col <= 8; col++) {
//             const box = document.createElement('div');
//             box.classList.add('box');

//             const button = document.createElement('button');
//             button.classList.add('button');
//             button.textContent = `${row}, ${col}`;
//             button.onclick = function() {
//                 handleButtonClick(this); // Call the handleButtonClick function
//             };

//             box.appendChild(button);
//             gridContainer.appendChild(box);
//         }
//     }
// });

// let selectedCount = 0;

// function handleButtonClick(button) {
//     if (button.classList.contains('selected')) {
//         button.classList.remove('selected');
//         selectedCount--;
//     } else {
//         if (selectedCount < 10) {
//             button.classList.add('selected');
//             selectedCount++;
//         }
//     }
// }
