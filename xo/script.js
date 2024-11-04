const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const playerTurnText = document.getElementById('player-turn');
const resultMessage = document.getElementById('resultMessage');
const winnerMessage = document.getElementById('winnerMessage');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (board[cellIndex] || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameOver(false);
        highlightWinner();
    } else if (board.every(cell => cell)) {
        gameOver(true);
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnText.textContent = `Player ${currentPlayer === 'X' ? 1 : 2}'s Turn (${currentPlayer})`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function gameOver(draw) {
    resultMessage.style.display = '';
    isGameActive = false;
    if (draw) {
        winnerMessage.textContent = "It's a Draw!";
    } else {
        winnerMessage.textContent = `Player ${currentPlayer === 'X' ? 1 : 2} Wins!`;
    }
    resultMessage.classList.add('active');
}

function highlightWinner() {
    const winningCombination = winningCombinations.find(combination =>
        combination.every(index => board[index] === currentPlayer)
    );

    winningCombination.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function restartGame() {
    resultMessage.style.display = 'none';
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    isGameActive = true;
    resultMessage.classList.remove('active');
    currentPlayer = 'X';
    playerTurnText.textContent = "Player 1's Turn (X)";
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);