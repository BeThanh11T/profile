
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const playerTurnText = document.getElementById('player-turn');
const resultMessage = document.getElementById('resultMessage');
const winnerMessage = document.getElementById('winnerMessage');

let currentPlayer = 'X';
let boardSize = 144; // Total cells for a 12x12 grid
let board = Array(boardSize).fill(null);
let isGameActive = true;

// Dynamically create cells for 12x12 grid
gameBoard.innerHTML = ''; // Clear previous cells if any
for (let i = 0; i < boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.cellIndex = i;
    cell.addEventListener('click', handleClick);
    gameBoard.appendChild(cell);
}

function handleClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.dataset.cellIndex);
    
    if (board[cellIndex] || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameOver(false);
    } else if (board.every(cell => cell)) {
        gameOver(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winningCombinations = generateWinningCombinations(12, 5); // Generate 5-in-a-row combinations

    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function generateWinningCombinations(gridSize, consecutive) {
    const combinations = [];
    
    // Rows
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col <= gridSize - consecutive; col++) {
            const start = row * gridSize + col;
            const combo = Array.from({length: consecutive}, (_, i) => start + i);
            combinations.push(combo);
        }
    }
    
    // Columns
    for (let col = 0; col < gridSize; col++) {
        for (let row = 0; row <= gridSize - consecutive; row++) {
            const start = row * gridSize + col;
            const combo = Array.from({length: consecutive}, (_, i) => start + i * gridSize);
            combinations.push(combo);
        }
    }
    
    // Diagonals (Top-left to Bottom-right)
    for (let row = 0; row <= gridSize - consecutive; row++) {
        for (let col = 0; col <= gridSize - consecutive; col++) {
            const start = row * gridSize + col;
            const combo = Array.from({length: consecutive}, (_, i) => start + i * (gridSize + 1));
            combinations.push(combo);
        }
    }
    
    // Diagonals (Top-right to Bottom-left)
    for (let row = 0; row <= gridSize - consecutive; row++) {
        for (let col = consecutive - 1; col < gridSize; col++) {
            const start = row * gridSize + col;
            const combo = Array.from({length: consecutive}, (_, i) => start + i * (gridSize - 1));
            combinations.push(combo);
        }
    }
    
    return combinations;
}

function gameOver(draw) {
    isGameActive = false;
    resultMessage.textContent = draw ? 'Draw!' : `Player ${currentPlayer} Wins!`;
    resultMessage.style.display = 'block';
}

restartButton.addEventListener('click', () => {
    board.fill(null);
    Array.from(gameBoard.children).forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    resultMessage.style.display = 'none';
    playerTurnText.textContent = `Player ${currentPlayer}'s turn`;
});
