const Player = (name, symbol) => {
  return {name, symbol};
}

let player1 = Player('Player 1',  'X');
let player2 = Player('Player 2', 'O');

const gameBoard = (() => {
  const matrix = new Array(9).fill(0);
  const getMatrix = () => matrix;
  const setCell = (cell, symbol) => {
    matrix[cell] = symbol;
  }
  const getCell = (cell) => matrix[cell];
  const isAvailable = (cell) => matrix[cell] === 0;
  const isFull = () => !matrix.includes(0);
  const reset = () => matrix.fill(0);
  return {
    getMatrix,
    setCell,
    getCell,
    isAvailable,
    isFull,
    reset
  }
})()

const game = (() => {
  let currentPlayer = undefined;
  let turns = 0;
  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [0,4,8], [1,4,7], [2,4,6], [2,5,8]
  ];

  const gameWon = () => {
    for(let comb of winningCombinations){
      let i = 0;
      let arr = gameBoard.getMatrix();
      if(arr[comb[i]] != 0){
        if(arr[comb[i]] == arr[comb[i + 1]] && arr[comb[i]] == arr[comb[i + 2]]){
          return true;
        }
      }
    }
    return false;
  }

  const isTie = () => gameBoard.isFull && !gameWon;

  const gameOver = () => gameWon || isTie;

  const getCurrentPlayer = () => {
    if(turns % 2 === 0){
      currentPlayer = player1;
    }else{
      currentPlayer = player2;
    }
    return currentPlayer;
  }

  const setCurrentPlayer = () => {
    turns++;
  }

  const resetTurns = () => turns = 0;

  return {
    gameWon,
    isTie,
    gameOver,
    getCurrentPlayer,
    setCurrentPlayer,
    resetTurns
  }
})()

const displayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const render = () => {
    for(let cell of cells){
      cell.innerHTML = '';
      cell.addEventListener("click", (e) => {
        _markCell(e);
        game.setCurrentPlayer();
        e.target.classList.add('disabled');
      })
    }

    document.getElementById("reset_btn").addEventListener("click", () => {
      game.resetTurns();
      gameBoard.reset();
      for(let cell of cells){
        cell.classList.remove('disabled');
        cell.innerHTML = '';
      }
    });
  }
  

  
  const _markCell = (cell) => {
    let currentPlayer = game.getCurrentPlayer();
    let box = document.getElementById(cell.target.id);
    if(gameBoard.isAvailable(cell.target.id)){
      gameBoard.setCell(cell.target.id, currentPlayer.symbol)
      box.innerHTML = currentPlayer.symbol;
    }
  }

  return { render };
})()

displayController.render();
