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
    let turn = 'o';
    

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


    // mode.addEventListener("click", function () {
    //     mode.style.display = 'none';
    //     board.style.display = 'block';
    // });

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
      turn = 'o';
    });

    X.addEventListener('click',function(){
      turn = 'x';
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
        if (tile(tileIndexArray[0], tileIndexArray[1]) == "") {
            index =  tileIndexArray;
            break;
        }
      }
              return index;
    }
    
    if(AIMode===false){
        for (let i = 0; i < row.length; i++) {
          for (let k = 0; k < row[i].children.length; k++) {
            row[i].children[k].addEventListener("click", function () {
              console.log(i);
              console.log(k);
              if (
                tile(i, k) == "" &&
                state.result !== "win" &&
                state.result !== "draw"
              ) {
                row[i].children[k].innerHTML = turn;
                boardState.push([i,k]);
                // handleTileClick();
                if (turn == "x") turn = "o";
                else turn = "x";
                state.message();
                console.log('human')
              }
            });
          }
        }
    }else{
      document.getElementById('turn').innerHTML=turn;
        for (let i = 0; i < row.length; i++) {
            for (let k = 0; k < row[i].children.length; k++) {
              row[i].children[k].addEventListener("click", function () {
                console.log([i,k])
                if (
                 row[i].children[k].innerHTML == "" &&
                  state.result !== "win" && state.filledTile!==9
                ) {
                  console.log('before fill');
                  row[i].children[k].innerHTML = turn;
                  state.filledTile++;
                  turn=='o' ? boardState.o.push([i,k]):boardState.x.push([i,k]);
                  checkWin(boardState,turn);
                  // handleTileClick();
                  if (turn == "x"){
                    console.log('x')
                    turn = "o";
                  } 
                  else {
                    console.log('o')
                    turn = "x";
                  }
                  state.message();
                  if (
                    state.result !== "win" && state.filledTile!==9
                  ) {
                    let randomTileIndex = aiChoiceIndex();
                    
                    console.log(randomTileIndex);
                    if(AIAdvanced==false){
                      let rowIndex = randomTileIndex[0];
                      let columnIndex = randomTileIndex[1];
                      row[rowIndex].children[
                      columnIndex
                    ].innerHTML = turn;
                    state.filledTile++
                    turn=='o' ? boardState.o.push([rowIndex,columnIndex]):boardState.x.push([rowIndex,columnIndex]);
                    }else{
                      let rowIndex = randomTileIndex[0];
                      let columnIndex = randomTileIndex[1];
                      row[rowIndex].children[
                        columnIndex
                      ].innerHTML = turn;
                      state.filledTile++;
                      turn=='o' ? boardState.o.push([rowIndex,columnIndex]):boardState.x.push([rowIndex,columnIndex]);

                    }
                    
                    checkWin(boardState,turn);
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

    