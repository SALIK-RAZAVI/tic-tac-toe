const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const statusElement = document.getElementById('status');

const playerX = '😊'; // Emoji for Player X
const playerO = '😂'; // Emoji for Player O

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = playerX;
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => handleCellClick(index));
        cellElement.textContent = cell;
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    createBoard();
    checkWinner();
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerX;
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

createBoard();
statusElement.textContent = `Player ${currentPlayer}'s turn`;
