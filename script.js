// vsAI.addEventListener("click", function () {
//     console.log('clicked')
//     mode.style.display='none';
//     vsAI.style.display='none';
//     vshuman.style.display='none';
// });
  
const winCombos = [
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
  [[0,0], [1,1], [2,2]],
  [[2,0], [1,1], [0,2]]
]

    const randomAI = document.getElementById("vsRandomAI");
    const advancedAI = document.getElementById("vsAdvancedAI");
    const vshuman = document.getElementById("vshuman");
    const board = document.getElementById("board");
    const playagin =document.getElementById("playagain");
    const menu = document.getElementById("menu");
    const row = document.querySelectorAll(".row");
    const message = document.getElementById('message');
    const O = document.getElementById('o');
    const X = document.getElementById('x');
    const gameStart = document.getElementById('gamestart')
    const firstTurn = 'o';
    const secondTurn='x';
    let humanPlayer = 'o';
    let turn=firstTurn;

    

    let boardState = {
        o:[],
        x:[]
    };

    let AIMode=true;
    let AIAdvanced=true;

    class State{
        constructor(){
            this.result=null;
            this.winner=null;
            this.filledTile=0;
        }

        message(){
            message.innerHTML=`${this.winner} ${this.result}`
        }

        boardReset(){
          turn='o';
            for (let i = 0; i < row.length; i++) {
                for (let k = 0; k < row[i].children.length; k++) {
                    row[i].children[k].innerHTML = '';                
                }            
            }
            this.result=null;
            this.winner=null;
            this.filledTile=0;
            this.message();
            boardState = {
              o:[],
              x:[]
          };
        }
    }
    const state= new State();

    function tile(i,k){
        return row[i].children[k].innerHTML;
    }

    function noChosenTiles(){
      let tiles=[];
      for(let i=0;i<3;i++){
        for(let k=0;k<3;k++){
          if(tile(i,k)===''){
            tiles.push([i,k])
          }
        }
      }
      return tiles;
    }
    
    playagin.addEventListener('click', function(){
        state.boardReset();
    });

    menu.addEventListener('click',function(){
        mode.style.display='block';
        board.style.display = 'none';
    });

    randomAI.addEventListener('click',function(){
        
        AIMode=true;
        AIAdvanced=false;
    });
    advancedAI.addEventListener('click',function(){
      AIMode=true;
      AIAdvanced=true;
  });

    O.addEventListener('click',function(){
      humanPlayer = 'o';
      aiPlayer='x';
    });

    X.addEventListener('click',function(){
      humanPlayer = 'x';
      aiPlayer = 'o';
    });

    function getRandomTile(){
        let tileIndexArray=[];
        for(let i=0;i<2;i++){
            tileIndexArray.push(Math.floor(Math.random() * 3));
        }
        return tileIndexArray;
    }

    function aiChoiceIndex() {
        let index;
      while(true) {
        let tileIndexArray=getRandomTile();
        if (tile(tileIndexArray[0], tileIndexArray[1]) === '') {
            index =  tileIndexArray;
            break;
        }
      }
              return index;
    }


    gameStart.addEventListener("click", function () {
      if (AIMode === false) {
        for (let i = 0; i < row.length; i++) {
          for (let k = 0; k < row[i].children.length; k++) {
            row[i].children[k].addEventListener("click", function () {
              console.log(i);
              console.log(k);
              if (
                tile(i, k) === null &&
                state.result !== "win" &&
                state.result !== "draw"
              ) {
                row[i].children[k].innerHTML = turn;
                boardState.push([i, k]);
                // handleTileClick();
                if (turn == "x") turn = "o";
                else turn = "x";
                state.message();
                console.log("human");
              }
            });
          }
        }
      } else {
        if (humanPlayer == "x") {
          let randomTileIndex = aiChoiceIndex();
          let rowIndex = randomTileIndex[0];
          let columnIndex = randomTileIndex[1];
          row[rowIndex].children[columnIndex].innerHTML = turn;
          state.filledTile++;
          turn == "o"
            ? boardState.o.push([rowIndex, columnIndex])
            : boardState.x.push([rowIndex, columnIndex]);
          checkWin(boardState, turn);
          // handleTileClick();
          if (turn == "x") turn = "o";
          else turn = "x";
          state.message();
          console.log("AI");
        }
        for (let i = 0; i < row.length; i++) {
          for (let k = 0; k < row[i].children.length; k++) {
            row[i].children[k].addEventListener("click", function () {
              console.log([i, k]);
              if (
                row[i].children[k].innerHTML === "" &&
                state.result !== "win" &&
                state.filledTile !== 9
              ) {
                console.log("before fill");
                row[i].children[k].innerHTML = turn;
                state.filledTile++;
                turn == "o"
                  ? boardState.o.push([i, k])
                  : boardState.x.push([i, k]);
                checkWin(boardState, turn);
                // handleTileClick();
                if (turn == "x") {
                  console.log("x");
                  turn = "o";
                } else {
                  console.log("o");
                  turn = "x";
                }
                state.message();
                if (state.result !== "win" && state.filledTile !== 9) {
                  let randomTileIndex = aiChoiceIndex();

                  console.log(randomTileIndex);
                  if (AIAdvanced == false) {
                    let rowIndex = randomTileIndex[0];
                    let columnIndex = randomTileIndex[1];
                    row[rowIndex].children[columnIndex].innerHTML = turn;
                    state.filledTile++;
                    turn == "o"
                      ? boardState.o.push([rowIndex, columnIndex])
                      : boardState.x.push([rowIndex, columnIndex]);
                  } else {
                    let rowIndex = randomTileIndex[0];
                    let columnIndex = randomTileIndex[1];
                    row[rowIndex].children[columnIndex].innerHTML = turn;
                    state.filledTile++;
                    turn == "o"
                      ? boardState.o.push([rowIndex, columnIndex])
                      : boardState.x.push([rowIndex, columnIndex]);
                  }

                  checkWin(boardState, turn);
                  // handleTileClick();
                  if (turn == "x") turn = "o";
                  else turn = "x";
                  state.message();
                  console.log("AI");
                }
              }
            });
          }
        }
      }
    });
    

    function checkWin(boardState, turn) {
      let isWin = winCombos.some((winCombo) => {
        return winCombo.every((coord) => {
          if (turn == "o") {
            console.log(turn)
            return boardState.o.some(
              (boardCoord) =>
                boardCoord[0] === coord[0] && boardCoord[1] === coord[1]
            );
          } else {
            console.log(turn)
            return boardState.x.some(
              (boardCoord) =>
                boardCoord[0] === coord[0] && boardCoord[1] === coord[1]
            );
          }
        });
      });
      if (isWin) {
        state.result = "win";
        state.winner = `${turn}`;
        console.log("win");
        return true;
      } else return false;
    }


    function minimax(newBoard, player) {
      var availSpots = noChosenTiles();
  
      if (checkWin(newBoard, huPlayer)) {//if human win
          return { score: -10 };
      } else if (checkWin(newBoard, aiPlayer)) {//if ai win
          return { score: 10 };
      } else if (availSpots.length === 0) {//if draw
          return { score: 0 };
      }
      var moves = [];
      for (var i = 0; i < availSpots.length; i++) {//try 
          var move = {};
          move.index = newBoard[availSpots[i]];//one of the option for moving
          newBoard[availSpots[i]] = player;//substitute player into one of the next available spots 
  
          if (player == aiPlayer) {
              var result = minimax(newBoard, huPlayer);//recursive function of human
              move.score = result.score;
          } else {
              var result = minimax(newBoard, aiPlayer);//recursive function of ai
              move.score = result.score;
          }
  
          newBoard[availSpots[i]] = move.index;
  
          moves.push(move);
      }
  
      var bestMove;
      if (player === aiPlayer) {
          var bestScore = -10000;
          for (var i = 0; i < moves.length; i++) {
              if (moves[i].score > bestScore) {//choose better move
                  bestScore = moves[i].score;
                  bestMove = i;
              }
          }
      } else {
          var bestScore = 10000;
          for (var i = 0; i < moves.length; i++) {
              if (moves[i].score < bestScore) {
                  bestScore = moves[i].score;
                  bestMove = i;
              }
          }
      }
  
      return moves[bestMove];
  }