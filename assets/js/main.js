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
    for (let i = 0; i < 9; i++){
      if (gameBoard.getMatrix()[i] === "X") {
        document.getElementById(`cell${i}`).innerHTML = "X"
        document.querySelector(`#cell${i}`).style.color = "red"
      }else if (gameBoard.getMatrix()[i] === "O") {
        document.getElementById(`cell${i}`).innerHTML = "O"
        document.querySelector(`#cell${i}`).style.color = "blue"
      }else {
        // show nothing
      }
    }
    let turns = 0;
    for (let j = 0; j < 9; j++){
      document.getElementById(`cell${j}`).addEventListener("click", () => {
        if (gameBoard.getMatrix()[j] == 0) {
          if (turns % 2 == 0){
            gameBoard.setCell(j, 'X')
            turns ++
            return render()
          }else {
            gameBoard.setCell(j, 'O')
            turns ++
            return render()
          }
        } else {
          // do nothing
        }
      })
    }
  }
  
  
  return render()


})()

const Player = (name, symbol) => {
  return {name, symbol};
}

let player1 = Player('Player 1', 'X');
let player2 = Player('Player 2', 'O');


displayController