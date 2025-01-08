
//A 3 X 3 ARRAY THAT INITIALLY HAS 0 (Inside Cell object)BUT THAT BY PLAYING CAN HAVE AN X OR AN O!

//Needs to be a factory so we can call it withou new
function GameBoard(){
    const board = []; //private?

    //Populate the board with 0s
    for(let row = 0; row<3;row++){
        board[row] = [];
        for(let col = 0; col<3;col++){
            board[row].push(Cell()); //Again we can call Cell() to crea te new cell object without new!
        }
    }

    const getBoard = () => {return board;} //since its private we need a way to acces it

    const isAvailable = (row,col)=>{
        if(board[row][col].getValue() === 0){
            return true;
        }
        return false;
    }

    const markCell = (row,col, playerToken) => {
        if( row < 0 || col > 2 || col < 0 || col>2){
            console.log("Out of bounds");
            return false;
        }

        const cellAvailable = isAvailable(row,col);
        
        if(!cellAvailable){
            console.log("ALREAFY MARKED TRY AGAIN!")
            return false;
        }

        board[row][col].addSymbol(playerToken);
        return true;

    }    
    
    const printBoard = () =>{
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue())) //We do this to see the value of the cell instead of the cell object
        console.log(boardWithCellValues);
    };

    const checkBoardHasWinner = (token) =>{
        //Check for rows
        for(let row = 0; row<3; row++){
            let countOfTokens = 0;
            for(let col= 0; col < 3; col++){
                if(board[row][col].getValue() === token){
                    countOfTokens++;
                }
            }
            if(countOfTokens==3){
                console.log(countOfTokens);
                return true;
            } 
        }

        //Check for columns
        for(let row = 0; row<3; row++){
            let countOfTokens = 0;
            for(let col= 0; col < 3; col++){
                if(board[col][row].getValue() === token){
                    countOfTokens++
                }
            }
            if(countOfTokens==3){
                return true;
            }
        }

        //check for diagonal
        let countOfTokens = 0;
        for(let i= 0; i<3;i++){
            if(board[i][i].getValue() === token){
                countOfTokens++
            }
            if(countOfTokens==3){
                return true;
            }
        }

        countOfTokens = 0;
        for(let i=0;i<3;i++){
            if(board[2-i][i].getValue() === token){
                countOfTokens++
            }
            if(countOfTokens==3){
                return true;
            }
        }
        return false;
    }

    const resetBoard = () =>{
        for(let row = 0; row<3;row++){
            for(let col = 0; col<3;col++){
                board[row][col].addSymbol(0); //Again we can call Cell() to crea te new cell object without new!
            }
        }
    }

    return {getBoard,printBoard,markCell,checkBoardHasWinner,resetBoard};
}

//We need a cell object so that we can write to it
function Cell(){
    let value = 0;

    const addSymbol = (playerToken) =>{
        value = playerToken;
    }

    const getValue = () => value;

    return {
        addSymbol,
        getValue
    };
}

//We need a player object
function Player(name,token){
    return{
        name,
        token
    };    
}

//We need a gameController Object

function gameController(){
    const board = (function(){return GameBoard()})();
    let round = 0;
    const players = [
        (function(){return Player("Javier","X")})(),
        (function(){return Player("Isidora","O")})()
    ];
    

    let activePlayer = players[0] //First turn goes to "X"

    const switchPlayerTurn = ()=>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    const getActivePlayer = () => activePlayer;

    const printNewRound = ()=>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row,col) =>{
        //console.log(`${getActivePlayer().name} marking his chosen cell`)
        const markedCell = board.markCell(row,col,getActivePlayer().token);
        if(!markedCell){
            return;
        }

        //We should also check if someone has won. If they have we end the game if not we play a new round and game continues
        const hasWinner = board.checkBoardHasWinner(getActivePlayer().token)
        if(hasWinner){
            gameFinish();
            return;
        }

        switchPlayerTurn();
        round++;
        if(!hasWinner && round == 9){
            gameDraw();
            return;
        }
        printNewRound();
        
    }

    const gameFinish = ()=> {
        console.log(`${getActivePlayer().name} HAS WON!`)
        startNewGame();
    };

    const startNewGame = ()=>{
        console.log("STARTING NEW GAME")
        board.resetBoard();
        round = 0;
        activePlayer = players[0]
        printNewRound()
    }

    const gameDraw = () =>{
        console.log("ITS A DRAW!")
        startNewGame();
    }


    // Initial play game message
    printNewRound();

    return {
        playRound,
        getActivePlayer
      };
}

const controller = (function() {return gameController()})();

//row WIN
controller.playRound(0, 0)  // X plays
controller.playRound(1, 1)  // O plays
controller.playRound(0, 1)  // X plays
controller.playRound(2, 2)  // O plays
controller.playRound(0, 2)  // X wins

controller.playRound(1, 0)   
controller.playRound(0, 0)   
controller.playRound(1, 1)   
controller.playRound(2, 2)   
controller.playRound(1, 2)   

controller.playRound(2, 0)  
controller.playRound(1, 1)  
controller.playRound(2, 1)  
controller.playRound(0, 0)  
controller.playRound(2, 2)  


//Column WIN
controller.playRound(0, 0)  
controller.playRound(0, 1)  
controller.playRound(1, 0)  
controller.playRound(2, 2)  
controller.playRound(2, 0) 

controller.playRound(0, 1)  
controller.playRound(0, 0)  
controller.playRound(1, 1)  
controller.playRound(2, 0)  
controller.playRound(2, 1) 

controller.playRound(0, 2)  
controller.playRound(1, 1)  
controller.playRound(1, 2)  
controller.playRound(0, 0)  
controller.playRound(2, 2) 


//diagonal
controller.playRound(0, 0)  
controller.playRound(0, 1)  
controller.playRound(1, 1)  
controller.playRound(2, 1)  
controller.playRound(2, 2) 

//antidiagonal
controller.playRound(0, 2)  
controller.playRound(0, 0)  
controller.playRound(1, 1)  
controller.playRound(2, 2)  
controller.playRound(2, 0)  

//DRAW

controller.playRound(0, 0)  
controller.playRound(0, 1)  
controller.playRound(0, 2)  
controller.playRound(1, 1)  
controller.playRound(1, 0)  
controller.playRound(1, 2)  
controller.playRound(2, 1)  
controller.playRound(2, 0)  
controller.playRound(2, 2)  