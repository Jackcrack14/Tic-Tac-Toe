const tiles = Array.from(document.querySelectorAll(".tile"));
const displayPlayer = document.querySelector(".display-player");
const reset = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

let currentPlayer  = "X";
let board = ["","","","","","","","",""];
let gameActive = true;

const PlayerX = "PLAYERX_WON";
const PlayerO = "PLAYERO_WON";
const Tie = "Tie"

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

const isValid = (tile) =>{
    if(tile.innerText === "X" || tile.innerText === "O"){
        return false
    }
    return true
}

const updateBoard = (index) =>{
    board[index] = currentPlayer;
}

const changePlayer = () =>{
    displayPlayer.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    displayPlayer.innerText = currentPlayer
    displayPlayer.classList.add(`player${currentPlayer}`)

}

const announcement = (type) =>{
    switch(type){
        case PlayerO:{
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        }
        case PlayerX:{
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        }
        case Tie:{
            announcer.innerText = 'Oops! It is a Tie!';
            break;
        }
        default:{
            announcer.innerText = "Something went Wrong!!!"
        }
    }
    announcer.classList.remove('hide');
}

function checkboard(){
    let roundWon = false;
    for(let i = 0;i <= 7 ;i++){
        const winCondi = winningConditions[i];
        const a = board[winCondi[0]];
        const b = board[winCondi[1]];
        const c = board[winCondi[2]];
        if(a ==="" || b === "" || c === ""){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;
        }

    }
    if(roundWon){
        announcement(currentPlayer === "X" ? PlayerX : PlayerO)
        gameActive = false;
        return
    }
    if(!board.includes("")){
        announcement(Tie)
    }
}

const userAction = (tile,index) => {
    if(isValid(tile) && gameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index)
        checkboard()
        changePlayer()

    }

}

tiles.forEach((tile,index) =>{
    tile.addEventListener('click',() => userAction(tile,index))

})

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    announcer.classList.add('hide');
    announcer.innerText = ""

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
    
}

reset.addEventListener('click', resetBoard);



// const tiles = Array.from(document.querySelectorAll('.tile'));
// const playerDisplay = document.querySelector('.display-player');
// const resetButton = document.querySelector('#reset');
// const announcer = document.querySelector('.announcer');

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let isGameActive = true;

// const PLAYERX_WON = 'PLAYERX_WON';
// const PLAYERO_WON = 'PLAYERO_WON';
// const TIE = 'TIE';

// const winningConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6]
// ];

// const isValidAction = (tile) => {
//   if (tile.innerText === 'X' || tile.innerText === 'O'){
//       return false;
//   }

//   return true;
// };

// const updateBoard =  (index) => {
//   board[index] = currentPlayer;
// }

// const changePlayer = () => {
//   playerDisplay.classList.remove(`player${currentPlayer}`);
//   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//   playerDisplay.innerText = currentPlayer;
//   playerDisplay.classList.add(`player${currentPlayer}`);
// }

// const announce = (type) => {
//   switch(type){
//      case PLAYERO_WON:
//           announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
//           break;
//      case PLAYERX_WON:
//           announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
//           break;
//      case TIE:
//           announcer.innerText = 'Tie';
//       }
//   announcer.classList.remove('hide');
// };

// function handleResultValidation() {
//   let roundWon = false;
//   for (let i = 0; i <= 7; i++) {
//     const winCondition = winningConditions[i];
//     const a = board[winCondition[0]];
//     const b = board[winCondition[1]];
//     const c = board[winCondition[2]];
//     if (a === "" || b === "" || c === "") {
//       continue;
//     }
//     if (a === b && b === c) {
//       roundWon = true;
//       break;
//     }
//   }

//   if (roundWon) {
//     announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
//     isGameActive = false;
//     return;
//   }

//   if (!board.includes("")) announce(TIE);
// }

// const userAction = (tile, index) => {
//   if (isValidAction(tile) && isGameActive) {
//     tile.innerText = currentPlayer;
//     tile.classList.add(`player${currentPlayer}`);
//     updateBoard(index);
//     handleResultValidation();
//     changePlayer();
//   }
// };  

// tiles.forEach( (tile, index) => {
//   tile.addEventListener('click', () => userAction(tile, index));
// });

// const resetBoard = () => {
//   board = ['', '', '', '', '', '', '', '', ''];
//   isGameActive = true;
//   announcer.classList.add('hide');

//   if (currentPlayer === 'O') {
//       changePlayer();
//   }

//   tiles.forEach(tile => {
//       tile.innerText = '';
//       tile.classList.remove('playerX');
//       tile.classList.remove('playerO');
//   });
// }

// resetButton.addEventListener('click', resetBoard);

