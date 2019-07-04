/* global document */

let modal = document.getElementById("modal");
let open_modal = document.getElementById("new_btn");
let players = [];

function addPlayers(player1, player2){
  // put new players into players array
  players = [
    player1,
    player2];
  modal.classList.remove("show");
  modal.classList.add("hidden");
  displayController.render();
}

document.getElementById("add-players").addEventListener("submit", (e)=> {
  e.preventDefault();
  // get player names
  let p1 = document.getElementById("player1").value;
  let p2 = document.getElementById("player2").value;
  addPlayers(p1, p2);
});


const Player = (name, symbol) => {
  return {
    name,
    symbol,
  };
};

const player1 = () => Player(players[0],  "X");
const player2 = () => Player(players[1],  "O");

const gameBoard = (() => {
  const matrix = new Array(9).fill(0);
  const getMatrix = () => matrix;
  const setCell = (cell, symbol) => {
    matrix[cell] = symbol;
  };
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
    reset,
  };
})();

const game = (() => {
  let currentPlayer = undefined;
  let turns = 0;
  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [0,4,8], [1,4,7], [2,4,6], [2,5,8],
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
  };

  const isTie = () => {
    return !gameBoard.getMatrix().some(pos => pos === 0);
  };

  const gameOver = () => gameWon() || isTie();

  const getCurrentPlayer = () => {
    if(turns % 2 === 0){
      currentPlayer = player1();
    }else{
      currentPlayer = player2();
    }
    return currentPlayer;
  };

  const setCurrentPlayer = () => {
    turns++;
  };

  const resetTurns = () => turns = 0;

  return {
    gameWon,
    isTie,
    gameOver,
    getCurrentPlayer,
    setCurrentPlayer,
    resetTurns,
  };
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  let status = document.querySelector(".status");

  const render = () => {
    const resetGame = () => {
      for(let cell of cells){
        cell.innerHTML = "";
        cell.classList.remove("disabled", "o-color", "x-color");
        cell.addEventListener("click", _playgame, false)
      }
      status.classList.remove("success", "tie");
      status.classList.add("hidden");
    };

    document.getElementById("reset_btn").addEventListener("click", () => {
      game.resetTurns();
      gameBoard.reset();
      resetGame();
      status.classList.add("hidden");
      status.innerHTML = "";
    });

    resetGame();
  };
  const _playgame = (e) => {
    _markCell(e);
    e.target.classList.add("disabled");
    _showStatus();
  };

  const _markCell = (cell) => {
    let currentPlayer = game.getCurrentPlayer();
    let box = document.getElementById(cell.target.id);
    if(gameBoard.isAvailable(cell.target.id)){
      gameBoard.setCell(cell.target.id, currentPlayer.symbol);
      box.classList.add(game.getCurrentPlayer().symbol === player1().symbol ? "x-color" : "o-color");
      box.innerHTML = currentPlayer.symbol;
    }
  };

  const _showStatus = () => {
    let currentPlayer = game.getCurrentPlayer();
    if(game.gameWon()){
      status.classList.remove("hidden");
      status.innerHTML = `${currentPlayer.name} has won the game!`;
      status.classList.add("success");
      _gameOver();
    }else if(game.isTie()){
      _gameOver();
      status.classList.remove("hidden");
      status.innerHTML = "The game is a tie"
      status.classList.add("tie")
    }else{
      game.setCurrentPlayer();
    }
  };

  const _gameOver = () => {
    if(game.gameOver()){
      for(let i = 0; i < cells.length; i++){
        cells[i].removeEventListener("click", _playgame, false);
        cells[i].classList.add("disabled");
      }
    }
  };

  return { render };
})();

// modal scripts
window.onload = function() {
  if (modal.classList.value === "hidden") {
    modal.classList.remove("hidden");
    modal.classList.add("show");
  }
};

open_modal.addEventListener("click", () => {
  if (modal.classList.value === "hidden") {
    modal.classList.remove("hidden");
    modal.classList.add("show");
    gameBoard.reset();
    game.resetTurns();
  }
});