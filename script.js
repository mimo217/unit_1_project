/* ---- constants ----*/
const roundLimit = 5;
const player1 = 'O';
const player2 = 'X';

/* ---- state variables ----*/
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer = player1;
let gameIsOngoing = true;

function resetGameBoard() {
  //reset the game board
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = player1;
  gameIsOngoing = true;
  renderGameBoard();
}

/*--- event listeners ----*/
// document.getElementById('gameboard').addEventListener('click', handleMove);
document.getElementById('player1').addEventListener('click', function () {
  currentPlayer = player1;
  document.querySelector('.current-player').innerText = 'O';
});
document.getElementById('player2').addEventListener('click', function () {
  currentPlayer = player2;
  document.querySelector('.current-player').innerText = 'X';
});
document.getElementById('dest1').addEventListener('click', function () {
  resetGameBoard('Paris');
});
document.getElementById('dest2').addEventListener('click', function () {
  resetGameBoard('Barcelona');
});
document.getElementById('dest3').addEventListener('click', function () {
  resetGameBoard('London');
});
document.getElementById('dest4').addEventListener('click', function () {
  resetGameBoard('Tokyo');
});
document.getElementById('dest5').addEventListener('click', function () {
  resetGameBoard('Beijing');
});


// /* ---- function ---- */
function removeClickEvent() {
  const cells = [...document.querySelectorAll('.cell')];

  cells.forEach((cell) => {
    cell.removeEventListener('click', displayCell);
    console.log(cell)
  });
}

function displayCell(row, col, cell) {
  console.log(row, col, gameBoard[row][col])

  if (gameBoard[row][col] === '') {
    cell.innerText = currentPlayer;
    gameBoard[row][col] = currentPlayer;
    // cell.classList.add(currentPlayer);


    const winner = checkWin();
    //check for a winner
    if (winner !== null) {
      gameIsOngoing = false;
      console.log(`${currentPlayer} wins!`);
      removeClickEvent();
    // check for a tie
    } else if (checkDraw()) {
      gameIsOngoing = false;
      console.log('The game is a draw!');
      removeClickEvent();
    } else {
      //change player
      currentPlayer = (currentPlayer == 'O') ? 'X' : 'O';
    }
  }
}

//Render the game board
function renderGameBoard() {
  const cells = [...document.querySelectorAll('.cell')];

  cells.forEach((cell) => {
    const row = cell.dataset.row;
    const col = cell.dataset.column;
    cell.addEventListener('click', () => displayCell(row, col, cell));
  });
}

function checkWin() {
  //check horizontals
  for (let row = 0; row < gameBoard.length; row++) {
    if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2] && gameBoard[row][0] !== '') {
      return gameBoard[row][0];
    }
  }

  //check verticals
  for (let col = 0; col < gameBoard.length; col++) {
    if (gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col] && gameBoard[0][col] !== '') {
      return gameBoard[0][col];
    }
  }

  //check diagonals
  for (let cell = 0; cell < gameBoard.length; cell++) {
    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== '') {
      return gameBoard[0][0];
    }
    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== '') {
      return gameBoard[0][2];
    }
    return null;
  }
}

function checkDraw() {
  //check if all cells are populated
  for (let row = 0; row < gameBoard.length; row++) {
    for (let col = 0; col < gameBoard.length; col++) {
      if (gameBoard[row][col] === '') {
        return false;
      }
    }
  }

  return true;
}

renderGameBoard();