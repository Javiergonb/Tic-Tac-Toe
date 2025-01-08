
//A 3 X 3 ARRAY THAT INITIALLY HAS 0 (Inside Cell object)BUT THAT BY PLAYING CAN HAVE AN X OR AN O!

//Needs to be a factory so we can call it withou new
function GameBoard(){
    const board = []; //private?

    //Populate the board with nulls
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
            return;
        }

        const cellAvailable = isAvailable(row,col);
        
        if(!cellAvailable){
            console.log("Already marked!");
            return;
        }

        board[row][col].addSymbol(playerToken);
        console.log(`Marked with ${playerToken}`)

    }    
    
    const printBoard = () =>{
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue())) //We do this to see the value of the cell instead of the cell object
        console.log(boardWithCellValues);
    };

    return {getBoard,printBoard,markCell};
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
        console.log(`${getActivePlayer().name} marking his chosen cell`)
        board.markCell(row,col,getActivePlayer().token);

        //We should also check if someone has won. If they have we end the game if not we play a new round and game continues

        switchPlayerTurn();
        printNewRound()
    }

    // Initial play game message
    printNewRound();

    return {
        playRound,
        getActivePlayer
      };
}

const controller = gameController();

controller.playRound(0,0);
controller.playRound(1,2);







