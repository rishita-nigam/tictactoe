// Game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;
let scores = {
  X: 0,
  O: 0
};

// Elements
const boardDiv = document.getElementById('board');
const cells = document.getElementsByClassName('cell');
const messageDiv = document.getElementById('message');
const leaderboardTable = document.getElementById('leaderboard');

// Update the board display
function updateBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = board[i];
  }
}

// Check if the current player has won
function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }

  return false;
}

// Make a move
function makeMove(index) {
  if (!gameEnded && board[index] === '') {
    board[index] = currentPlayer;
    updateBoard();

    if (checkWin(currentPlayer)) {
      scores[currentPlayer]++;
      messageDiv.textContent = `Player ${currentPlayer} wins!`;
      gameEnded = true;
    } else if (!board.includes('')) {
      messageDiv.textContent = "It's a draw!";
      gameEnded = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Display the leaderboard
function updateLeaderboard() {
  leaderboardTable.innerHTML = '';

  for (let player in scores) {
    let row = leaderboardTable.insertRow();
    let nameCell = row.insertCell();
    let scoreCell = row.insertCell();

    nameCell.textContent = player;
    scoreCell.textContent = scores[player];
  }
}

// Reset the game
function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameEnded = false;
  messageDiv.textContent = `Player ${currentPlayer}'s turn`;
  updateBoard();
}

// Initialize the game
resetGame();
updateLeaderboard();
