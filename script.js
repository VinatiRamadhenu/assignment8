const board = new Array(3).fill(null).map(() => new Array(3).fill(null));
let currentPlayer = 'X';

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');

const title = document.createElement('h1');
title.textContent = 'Tic Tac Toe';

const turnDisplay = document.createElement('div');
turnDisplay.classList.add('turn-display');
turnDisplay.textContent = `Current Player: ${currentPlayer}`;

const resultDisplay = document.createElement('div');
resultDisplay.classList.add('result-display');

const restartButton = document.createElement('button');
restartButton.textContent = 'Restart Game';
restartButton.classList.add('restart-button');
restartButton.addEventListener('click', restartGame);

const boardContainer = document.createElement('div');
boardContainer.classList.add('board-container');

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.addEventListener('click', cellClick);
    boardContainer.appendChild(cell);
  }
}

gameContainer.appendChild(title);
gameContainer.appendChild(turnDisplay);
gameContainer.appendChild(resultDisplay);
gameContainer.appendChild(restartButton);
gameContainer.appendChild(boardContainer);

document.body.appendChild(gameContainer);

function cellClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (board[row][col] === null) {
    board[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      resultDisplay.textContent = `Player ${currentPlayer} wins!`;
    } else if (checkDraw()) {
      resultDisplay.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turnDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
  }
}


function checkWin(player) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true; 
    }
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true; 
    }
  }
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true; 
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true; 
  }
  return false;
}

function checkDraw() {
  return board.flat().every((cell) => cell !== null);
}

function restartGame() {
  board.forEach((row, i) => row.fill(null));
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => (cell.textContent = ''));
  resultDisplay.textContent = '';
  currentPlayer = 'X';
  turnDisplay.textContent = `Current Player: ${currentPlayer}`;
}