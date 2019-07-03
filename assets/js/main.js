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
  const currentPlayer = undefined;
  const turns = 0;
  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [0,4,8], [1,4,7], [2,4,6], [2,5,8]
  ];

  const gameWon = () => {
    for(comb of winningCombinations){
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

  const getCurrentPlayer = () => (turns % 2 === 0)? currentPlayer = player1 : player2;
  
  const increaseTurn = () => turn++;
  return {
    gameWon,
    isTie,
    gameOver,
    getCurrentPlayer,
    increaseTurn
  }
})()

const displayController = (() => {
  const render = () => {
    for (let i = 0; i < matrix.length; i++){
      const boardPosition = document.querySelector('#cell${i + 1}');
      if (boardPosition[i] === "X") {
        boardPosition.style.color = "#00C"
      }else {
        boardPosition.style.color = "#C00"
      }
      boardPosition.innerHTML = '${boardPosition[i]}'
    }
  }


})()

const Player = (name, symbol) => {
  return {name, symbol};
}

let player1 = Player('Player 1', 'X');
let player2 = Player('Player 2', 'O');