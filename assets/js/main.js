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
  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [0,4,8], [1,4,7], [2,4,6], [2,5,8]
  ];

  const gameWon = (symbol) => {
    for(comb of winningCombinations){
      let i = 0;
      let arr = gameBoard.getMatrix();
      if(arr[comb[i]] === symbol){
        if(arr[comb[i]] == arr[comb[i + 1]] && arr[comb[i]] == arr[comb[i + 2]]){
          return true;
        }
      }
    }
    return false;
  }

  const isTie = () => gameBoard.isFull && !gameWon;
  const gameOver = () => gameWon || isTie;
})()

const displayController = (() => {

})()

const players = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {getName, getSymbol};
}