// vsAI.addEventListener("click", function () {
//     console.log('clicked')
//     mode.style.display='none';
//     vsAI.style.display='none';
//     vshuman.style.display='none';
// });

const winCombos = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
];

const randomAI = document.getElementById("vsRandomAI");
const advancedAI = document.getElementById("vsAdvancedAI");
const vshuman = document.getElementById("vshuman");
const board = document.getElementById("board");
const playagin = document.getElementById("playagain");
const menu = document.getElementById("menu");
const row = document.querySelectorAll(".row");
const message = document.getElementById("message");
const O = document.getElementById("o");
const X = document.getElementById("x");
const gameStart = document.getElementById("gamestart");
const firstTurn = "o";
const secondTurn = "x";
let humanPlayer = "o";
let aiPlayer = "x";
let turn = firstTurn;

let boardState = {
  o: [],
  x: [],
};

let AIMode = true;
let AIAdvanced = true;

class State {
  constructor() {
    this.result = null;
    this.winner = null;
    this.filledTile = 0;
  }

  message() {
    message.innerHTML = `${this.winner} ${this.result}`;
  }

  boardReset() {
    turn = "o";
    for (let i = 0; i < row.length; i++) {
      for (let k = 0; k < row[i].children.length; k++) {
        row[i].children[k].innerHTML = "";
      }
    }
    this.result = null;
    this.winner = null;
    this.filledTile = 0;
    this.message();
    boardState = {
      o: [],
      x: [],
    };
  }
}
const state = new State();

playagin.addEventListener("click", function () {
  state.boardReset();
});

menu.addEventListener("click", function () {
  mode.style.display = "block";
  board.style.display = "none";
});

randomAI.addEventListener("click", function () {
  AIMode = true;
  AIAdvanced = false;
});
advancedAI.addEventListener("click", function () {
  AIMode = true;
  AIAdvanced = true;
});

O.addEventListener("click", function () {
  humanPlayer = "o";
  aiPlayer = "x";
});

X.addEventListener("click", function () {
  humanPlayer = "x";
  aiPlayer = "o";
});

function tile(i, k) {
  return row[i].children[k].innerHTML;
}

function noChosenTiles() {
  let tiles = [];
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      if (!boardState.o.some(coord => coord[0] === i && coord[1] === k) &&
          !boardState.x.some(coord => coord[0] === i && coord[1] === k)) {
        tiles.push([i, k]);
      }
    }
  }
  return tiles;
}


function getRandomTile() {
  let tileIndexArray = [];
  for (let i = 0; i < 2; i++) {
    tileIndexArray.push(Math.floor(Math.random() * 3));
  }
  return tileIndexArray;
}

function aiChoiceIndex() {
  let index;
  while (true) {
    let tileIndexArray = getRandomTile();
    if (tile(tileIndexArray[0], tileIndexArray[1]) === "") {
      index = tileIndexArray;
      break;
    }
  }
  return index;
}

function notEnd(){
  return (
  state.result !== "win" &&
  state.result !== "draw")
}

function handleClickTile(i, k) {
  row[i].children[k].innerHTML = turn;
  state.filledTile++;
  
  boardState[turn].push([i, k]);
  
  if (checkWin(boardState, turn) || state.filledTile === 9) {
    state.result = checkWin(boardState, turn) ? "win" : "draw";
    state.winner = checkWin(boardState, turn) ? turn : null;
  } else {
    turn = turn === "o" ? "x" : "o";
  }
  state.message();
}

function checkWin(boardState, turn) {
  return winCombos.some(winCombo => winCombo.every(coord => 
    (turn === "o" ? boardState.o : boardState.x).some(boardCoord => 
      boardCoord[0] === coord[0] && boardCoord[1] === coord[1]
    )
  ));
}

gameStart.addEventListener("click", function () {
  if(humanPlayer==='x'){if (notEnd() && AIMode) {
    const [rowIndex, columnIndex] = aiChoiceIndex();
    handleClickTile(rowIndex, columnIndex);
  }}//fist turn
  for (let i = 0; i < row.length; i++) {
    for (let k = 0; k < row[i].children.length; k++) {
      const handleClick = () => {
        if (tile(i, k) === '' && notEnd()) {
          handleClickTile(i, k);
          if (notEnd() && AIMode) {
            const [rowIndex, columnIndex] = AIAdvanced ? minimax(boardState, aiPlayer).move : aiChoiceIndex();
            handleClickTile(rowIndex, columnIndex);
          }
        }
      };
      row[i].children[k].addEventListener("click", handleClick);
    }
  }
});

function minimax(newBoard, player) {
  let availSpots = noChosenTiles();

  if (checkWin(newBoard, humanPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = availSpots[i];

    if (player === 'o') {
      newBoard.o.push(availSpots[i]);
    } else {
      newBoard.x.push(availSpots[i]);
    }

    if (player === aiPlayer) {
      let result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    if (player === 'o') {
      newBoard.o.pop();
    } else {
      newBoard.x.pop();
    }

    move.coord = availSpots[i];
    moves.push(move);
  }

  let bestMove;
  let bestScore = player === aiPlayer ? -10000 : 10000;

  for (let i = 0; i < moves.length; i++) {
    if ((player === aiPlayer && moves[i].score > bestScore) ||
        (player !== aiPlayer && moves[i].score < bestScore)) {
      bestScore = moves[i].score;
      bestMove = moves[i].coord;
    }
  }

  return { move: bestMove, score: bestScore };
}
