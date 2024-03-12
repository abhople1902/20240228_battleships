// Global variables
let currentPlayer = "player1";
let player1TimeLimit = 30; // 30 seconds for player 1's turn
let player2TimeLimit = 30; // 30 seconds for player 2's turn
let player1TimeRemaining = player1TimeLimit;
let player2TimeRemaining = player2TimeLimit;
let turnTimeoutId;

// Function to start the turn timeout
function startTurnTimeout() {
    let timeLimit = currentPlayer === "player1" ? player1TimeLimit : player2TimeLimit;
    turnTimeoutId = setTimeout(switchTurn, timeLimit * 1000); // Convert seconds to milliseconds
}

// Function to switch the turn to the next player
function switchTurn() {
    clearTimeout(turnTimeoutId); // Clear the turn timeout
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1"; // Switch player
    console.log("Turn switched to " + currentPlayer);
    startTurnTimeout(); // Start the turn timeout for the next player
}

// Function to handle player's move
function playerMove() {
    // Perform player's move logic here...
    console.log("Player " + currentPlayer + " made a move.");

    // After the move, switch to the next player's turn
    switchTurn();
}

// Example usage:
startTurnTimeout(); // Start the turn timeout for the first player's turn
playerMove();
