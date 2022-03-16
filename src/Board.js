
import {Fragment, useState} from 'react';
import Clock from './Clock.js'
import ReactDOM from 'react-dom';

function advanceColor(color) {
    if( color === 'white' )
        return 'blue';
    if( color === 'blue' )
        return 'red';
    return 'blue';
}

function valueCheck(value){
    if(value == "O"){ //bomb
        return "red"
    }
    if (value == "F"){ //flag
        return "blue";
    }
    if(value == "0"){
        return "grey"
    }
    if(value == "1"){
        return "green"
    }
    if(value == "2"){
        return "yellow"
    }
    if(value == "3"){
        return "brown"
    }
    if(value == "4"){
        return "pink"
    }
    if(value == "5"){
        return "lime"
    }
    if(value == "6"){
        return "aqua"
    }
    if(value == "7"){
        return "teal"
    }
    if(value == "8"){
        return "purple"
    }
}



function Cell(props) {


    let display = "";
    let pixels;
    if(props.cell.isOccupied == true){
        display = props.cell.value 
    }

    if(props.cell.value == 0){
        display = ""
    }

    if(props.cell.color == "blue"){
        display = "F"
    }

    if(BoardType == 'S'){
        pixels = "50px";
    }
    else if(BoardType == 'M'){
        pixels = "40px";
    }
    else{
        pixels = "35px";
    }
    return (
        <td onClick={() => props.handleClick(props.rowIdx, props.colIdx)} width={pixels} height={pixels}
            style={{backgroundColor: props.cell.color}}
            onContextMenu={(e) => {
                props.handleRightClick(props.rowIdx, props.colIdx);
                e.preventDefault();
            } }
            contextMenu="none">
                {display}
        </td>
    );
}

function Row(props) {
    return (
        <tr>{ props.row.map( (cell, idx) => <Cell key={uniqueKey()}
                                                  cell={cell}
                                                  rowIdx={props.rowIdx}
                                                  colIdx={idx}
                                                  handleClick={props.handleClick}
                                                  handleRightClick={props.handleRightClick}
        />)
        }
        </tr>
    )
}

let key = 1;
function uniqueKey() {
    return key++;
}

var NUM_ROWS;
var NUM_COLUMNS; 
var BOMB_COUNT;
var BoardType; 

function isSafe(x, y){
    return (x >= 0 && x < NUM_ROWS && y >= 0 && y < NUM_COLUMNS);
}
function Dupe(arr, r,c){
    for(let i = 0; i < arr.length; i++){
        if (arr[i][0] == r && arr[i][1] == c){
            return true;
        }
    }
    return false;
}
function createInitialState() {
    let boardInfoArray = document.getElementById("boardSize").innerText.split(" ");
    NUM_ROWS = parseInt(boardInfoArray[0]);
    NUM_COLUMNS = parseInt(boardInfoArray[1]);
    BOMB_COUNT = parseInt(boardInfoArray[2]);
    BoardType = boardInfoArray[3];
    console.log(NUM_ROWS, NUM_COLUMNS, BOMB_COUNT);
    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: "white", isOccupied: false, value: "0"}));
    board = board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));
    
    var bombArr = []
    let count = 0
    while(count < BOMB_COUNT){
        var r = Math.floor(Math.random() * NUM_ROWS);
        var c = Math.floor(Math.random() * NUM_COLUMNS);
            if(!Dupe(bombArr, r, c)){
                board[r][c].value = "O";
                bombArr.push([r,c]);
                count += 1;
            }
    }

    for(let i = 0; i < board.length; i++){ //loop through row length
        for(let j = 0; j < board[0].length; j++){ //loop through col length
            let bombcount = 0;
            //} //edge search
            if(isSafe(i-1,j-1)) //up left
            {
                if(board[i-1][j-1].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i-1,j)) //up 
            {
                if(board[i-1][j].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i-1,j+1)) //up right
            {
                if(board[i-1][j+1].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i,j-1)) //left
            {
                if(board[i][j-1].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i, j+1)) //right
            {
                if(board[i][j+1].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i+1,j-1)) //down left
            {
                if(board[i+1][j-1].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i+1,j)) //down
            {
                if(board[i+1][j].value == "O"){
                    bombcount += 1
                }
            }
            if(isSafe(i+1,j+1)) //down right
            {
                if(board[i+1][j+1].value == "O"){
                    bombcount += 1
                }
            }
            if(board[i][j].value != "O"){
                board[i][j].value = bombcount.toString();
            }
        }
    }
    
    return {
        board,
        haveAWinner: false,
        hasClicked: false
    };
}


export default function Board(props) {

    const [boardState, setBoardState ] = useState(createInitialState);
    
    function surroundEmpty(arr){
        let res = [];
        for(let i = 0; i < arr.length; i++){
            res.push([arr[i][0],arr[i][1]]);
            if(isSafe(arr[i][0]-1,arr[i][1]-1)) //up left
            {
                res.push([arr[i][0]-1,arr[i][1]-1])
            }
            if(isSafe(arr[i][0]-1,arr[i][1])) //up 
            {
                res.push([arr[i][0]-1,arr[i][1]])
            }
            if(isSafe(arr[i][0]-1,arr[i][1]+1)) //up right
            {
                res.push([arr[i][0]-1,arr[i][1]+1])
            }
            if(isSafe(arr[i][0],arr[i][1]-1)) //left
            {
                res.push([arr[i][0],arr[i][1]-1])
            }
            if(isSafe(arr[i][0], arr[i][1]+1)) //right
            {
                res.push([arr[i][0], arr[i][1]+1])
            }
            if(isSafe(arr[i][0]+1,arr[i][1]-1)) //down left
            {
                res.push([arr[i][0]+1,arr[i][1]-1])
            }
            if(isSafe(arr[i][0]+1,arr[i][1])) //down
            {
                res.push([arr[i][0]+1,arr[i][1]])
            }
            if(isSafe(arr[i][0]+1,arr[i][1]+1)) //down right
            {
                res.push([arr[i][0]+1,arr[i][1]+1])
            }
        }
        return res;
    }

    function isUsedHelper(arr, r, c){
        for(let i = 0; i < arr.length; i++){
            if(arr[i][0] == r && arr[i][1] == c){
                return true;
            }
        }
        return false;
    }

    function getBombs(board){
        let arr = []
        for(let i = 0; i < NUM_ROWS; i++){
            for (let j = 0 ; j < NUM_COLUMNS; j++){
                if(board[i][j].value == "O"){ //take away users correct flags
                    arr.push([board[i][j].row,board[i][j].column]);
                }
            }
        }
        return arr;
    }

    function getUnflaggedBombs(board){
        let arr = []
        for(let i = 0; i < NUM_ROWS; i++){
            for (let j = 0 ; j < NUM_COLUMNS; j++){
                if(board[i][j].value == "O" && board[i][j].color != "blue"){ //dont take away users correct flags
                    arr.push([board[i][j].row,board[i][j].column]);
                }
            }
        }
        return arr;
    }

    function getMissedFlage(board){
        let arr = []
        for(let i = 0; i < NUM_ROWS; i++){
            for (let j = 0 ; j < NUM_COLUMNS; j++){
                if(board[i][j].value != "O" && board[i][j].color == "blue"){ //get users missed flags
                    arr.push([board[i][j].row,board[i][j].column]);
                }
            }
        }
        return arr;
    }

    function getValued(board){
        let arr = []
        for(let i = 0; i < NUM_ROWS; i++){
            for (let j = 0 ; j < NUM_COLUMNS; j++){
                if(board[i][j].value != "O" && board[i][j].isOccupied == false){
                    arr.push([board[i][j].row,board[i][j].column]);
                }
            }
        }
        return arr;
    }
    
    function revealAll(board, r, c){
        let arr = [];
        recursiveCheck(board,r,c);
        function recursiveCheck(board, r, c){
            console.log(board[r][c].value);
            if(board[r][c].value != 0){
                return //base case do not do anything because we are not on a 0 
            }
            arr.push([r,c]);

            if(isSafe(r-1,c-1) && !isUsedHelper(arr,r-1,c-1)) //up left
            {
                recursiveCheck(board,r-1,c-1);
            }

            if(isSafe(r-1,c) && !isUsedHelper(arr,r-1,c)) //up 
            {
                recursiveCheck(board,r-1,c);
            }

            if(isSafe(r-1,c+1) && !isUsedHelper(arr,r-1,c+1)) //up  right
            {
                recursiveCheck(board,r-1,c+1);
            }

            if(isSafe(r,c-1) && !isUsedHelper(arr,r,c-1)) //left
            {
                recursiveCheck(board,r,c-1);
            }
            if(isSafe(r, c+1) && !isUsedHelper(arr,r,c+1)) //right
            {
                recursiveCheck(board,r,c+1);
            }

            if(isSafe(r+1,c-1) && !isUsedHelper(arr,r+1,c-1) ) //down left
            {
                recursiveCheck(board,r+1,c-1);
            }

            if(isSafe(r+1,c) && !isUsedHelper(arr,r+1,c) ) //down
            {
                recursiveCheck(board,r+1,c);
            }

            if(isSafe(r+1,c+1) && !isUsedHelper(arr,r+1,c+1) ) //down right
            {
                recursiveCheck(board,r+1,c+1);
            }
            //bool
        }
        let res = surroundEmpty(arr);
        return res;
    }

    function handleRightClick(rowIdx, colIdx){
        if(boardState.haveAWinner == true){
            return;
        }
        let board = boardState.board;
        let affectedRow = board[rowIdx].slice();
        if(affectedRow[colIdx].isOccupied == true){
            return;
        }
        if(affectedRow[colIdx].color == "blue"){
            affectedRow[colIdx] = {
                ...affectedRow[colIdx],
                color: "white",
                isOccupied: false
            };
            let newBoard = board.slice();
            newBoard[rowIdx] = affectedRow;
    
            setBoardState({
                ...boardState,
                board: newBoard,
            });
        }
        else{
            affectedRow[colIdx] = {
                ...affectedRow[colIdx],
                color: "blue",
                isOccupied: false
            };
            let newBoard = board.slice();
            newBoard[rowIdx] = affectedRow;
    
            setBoardState({
                ...boardState,
                board: newBoard,
            });
        }
        
    }
    function updateIfWinner(newBoard){
        for(let i = 0; i < newBoard.length; i++){
            for(let j = 0; j < newBoard[0].length; j++){
                if(newBoard[i][j].isOccupied == false && newBoard[i][j].value != "O"){
                   return false
                }
            }
        }
        return true;
    }
    
    function removeDuplicates(arr){
        let res = []
        for(let i = 0; i < arr.length; i++){
            for(let j = 0 ; j < res.length; j++){
                if(res[j] == arr[i]){
                    continue;
                }
                if(i == res.length-1){
                    res.push(arr[i]);
                }
            }
        }
        return res;

    }
    function handleClick(rowIdx, colIdx) {
        if(boardState.haveAWinner == true){
            return;
        }
        if(boardState.board[rowIdx][colIdx].isOccupied == true){
            return
        }
        if(boardState.hasClicked == false){
            ReactDOM.render(<Clock/>, document.getElementById('clock'));
            setBoardState({
                ...boardState,
                hasClicked: true,
            });
        }
        let board = boardState.board;
        console.log(`handleClick called with rowIdx = ${rowIdx}, colIdx = ${colIdx}, ${JSON.stringify(boardState)}`);
        let affectedRow = board[rowIdx].slice();
        if(affectedRow[colIdx].color == "blue"){
            return; // must remove flag first in order to click
        }
        else if(affectedRow[colIdx].value == 0){
            let groupReveal = revealAll(board, rowIdx, colIdx);
            let Modified = boardState.board;
            groupReveal.forEach(m => {
                let row = Modified[m[0]].slice();
                row[m[1]] = {
                    ...row[m[1]],
                    color: valueCheck(row[m[1]].value),
                    isOccupied: true
                }
                Modified[m[0]] = row;
            })
            setBoardState({
                ...boardState,
                Modified
            })
            let result = updateIfWinner(Modified);
            if( result == true){
                const stoptime = document.getElementById("clock").innerText;
                ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
                document.getElementById("stopClock").innerHTML = stoptime;
                document.getElementById("winMessage").innerText = "YOU WON!";
                document.getElementById("reveal").style.display = "none";
                let bombReveal = getUnflaggedBombs(board);
                let Mod = boardState.board;
                bombReveal.forEach(m => {
                    let row = Mod[m[0]].slice();
                    row[m[1]] = {
                        ...row[m[1]],
                        color: valueCheck(row[m[1]].value),
                        isOccupied: true
                    }
                    Mod[m[0]] = row;
                })
                setBoardState({
                    ...boardState,
                    Mod
                })
            }

        }
        else if(affectedRow[colIdx].value == "O"){
            const stoptime = document.getElementById("clock").innerText;
            ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
            document.getElementById("stopClock").innerHTML = stoptime;
            document.getElementById("winMessage").innerText = "YOU LOST!";
            document.getElementById("reveal").style.display = "none";
            let bombReveal = getUnflaggedBombs(board);
            let missedFlags = getMissedFlage(board);
            let values = getValued(board)
            bombReveal.push([rowIdx, colIdx]);
            let Mod = boardState.board;
            
            values.forEach(m => {
                let row = Mod[m[0]].slice();
                row[m[1]] = {
                    ...row[m[1]],
                    value: "",
                    color: "white",
                    isOccupied: true
                }
                Mod[m[0]] = row;
            });
            bombReveal.forEach(m => {
                let row = Mod[m[0]].slice();
                row[m[1]] = {
                    ...row[m[1]],
                    color: valueCheck(row[m[1]].value),
                    isOccupied: true
                }
                Mod[m[0]] = row;
            });
            missedFlags.forEach(m => {
                let row = Mod[m[0]].slice();
                row[m[1]] = {
                    ...row[m[1]],
                    value: "MISS",
                    color: "DeepPink",
                    isOccupied: true
                }
                Mod[m[0]] = row;
            });
            setBoardState({
                ...boardState,
                board: Mod,
                haveAWinner: true,
            })
        }
        else{
            console.log(`existing cell before change of color contains ${JSON.stringify(affectedRow[colIdx])}`);
            affectedRow[colIdx] = {
                ...affectedRow[colIdx],
                color: valueCheck(affectedRow[colIdx].value),
                isOccupied: true
            };
            console.log(`existing cell after change of color contains ${JSON.stringify(affectedRow[colIdx])}`);
    
    
            let newBoard = board.slice();
            newBoard[rowIdx] = affectedRow;
            let result = updateIfWinner(newBoard);
            if( result == true){

                const stoptime = document.getElementById("clock").innerText;
                ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
                document.getElementById("stopClock").innerHTML = stoptime;
                document.getElementById("reveal").style.display = "none";
                document.getElementById("winMessage").innerText = "YOU WON!";
                let bombReveal = getUnflaggedBombs(board);
                bombReveal.push([rowIdx, colIdx]);
                let Mod = boardState.board;
                bombReveal.forEach(m => {
                    let row = Mod[m[0]].slice();
                    row[m[1]] = {
                        ...row[m[1]],
                        color: valueCheck(row[m[1]].value),
                        isOccupied: true
                    }
                    Mod[m[0]] = row;
                })
                setBoardState({
                    ...boardState,
                    board: Mod,
                    haveAWinner: true,
                })
            }
            else{
                setBoardState({
                    ...boardState,
                    board: newBoard,
                });
            }
        }
        
    }

    function reveal(){
        if(document.getElementById("reveal").value == "on" || boardState.haveAWinner === true){
            let arr = getBombs(boardState.board);
            let Modified = boardState.board;
            arr.forEach(m => {
                let row = Modified[m[0]].slice();
                row[m[1]] = {
                    ...row[m[1]],
                    color: valueCheck(row[m[1]].value),
                    isOccupied: true
                }
                Modified[m[0]] = row;
            })
            setBoardState({
                ...boardState,
                Modified
            })
            document.getElementById("reveal").value = "off";
            }
        else{
            let arr = getBombs(boardState.board);
            let Modified = boardState.board;
            arr.forEach(m => {
                let row = Modified[m[0]].slice();
                row[m[1]] = {
                    ...row[m[1]],
                    color: "white",
                    isOccupied: false
                }
                Modified[m[0]] = row;
            })
            setBoardState({
                ...boardState,
                Modified
            })
            document.getElementById("reveal").value = "on";
        }
    }
    return (
        
        <Fragment>
            <table border={1} align="center">
                <tbody>
                {
                    boardState.board.map((row, rowIdx) => (<Row key={uniqueKey()}
                                                                row={row}
                                                                rowIdx={rowIdx}
                                                                handleClick={handleClick}
                                                                handleRightClick={handleRightClick}
                    />))
                }
                </tbody>
            </table>
            <div align="center">
                <button id="reveal" value="on"  align="center" onClick={() => reveal()}>Show Bombs</button>
            </div>
        </Fragment>
    );
}