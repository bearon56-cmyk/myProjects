let gameStart = true
let currentPlayer = "X"
currentPlayer.id = "currentPlayer"
const gameTable = [
    "", "", "",
    "", "", "",
    "", "", "",
]
const winningSequence = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]


let cells = document.querySelectorAll(".cell")
onStart()

function onStart(){

    if(!gameStart){
        return
    }
    cells.forEach(cell => cell.addEventListener("click", cellClick))

}

function cellClick() {
    const cellIndex = this.getAttribute("cellNumber")
    if (gameTable[cellIndex] != ""){
        return
    }
    this.textContent = currentPlayer
    gameTable[cellIndex] = currentPlayer
    changePlayer()
    checkWin()
}


function changePlayer(){
    if (currentPlayer == "X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X"}
}

function checkWin(){
    for (let i = 0; i < winningSequence.length; i++) {
        const winningOption = winningSequence[i];
        let index1 = gameTable[winningOption[0]]
        let index2 = gameTable[winningOption[1]]
        let index3 = gameTable[winningOption[2]]

        if (index1 == "" || index2 == "" || index3 == "") {
            continue
        }
        if(index1 == index2 && index2 == index3){
            console.log("You win")
            break
        }
        else if(!gameTable.includes("") && index1 !== index2 && index2 !== index3){
            console.log("draw")
        }
    }
}


































// let gameStart = true
// let currentPlayer = "X"
// const gameTable = [
//     "", "", "",
//     "", "", "",
//     "", "", "",
// ]
// const winningSequence = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]

// ]


// let cells = document.querySelectorAll(".cell")
// onStart()

// function onStart(){

//     if(!gameStart){
//         return
//     }
//     cells.forEach(cell => cell.addEventListener("click", cellClick))

// }

// function cellClick() {
//     const cellIndex = this.getAttribute("cellNumber")
//     if (gameTable[cellIndex] != ""){
//         return
//     } 
//     console.log(this)
//     this.textContent = currentPlayer
//     gameTable[cellIndex] = currentPlayer
//     changePlayer()
//     checkWin()
// }


// function changePlayer(){
//     if (currentPlayer == "X"){
//         currentPlayer = "O"
//     }
//     else{
//         currentPlayer = "X"}
// }

// function checkWin(){
//     for (let i = 0; i < winningSequence.length; i++) {
//         const winningOption = winningSequence[i];
//         let index1 = gameTable[winningOption[0]]
//         let index2 = gameTable[winningOption[1]]
//         let index3 = gameTable[winningOption[2]]

//         if (index1 == "" || index2 == "" || index3 == "") {
//             continue
//         }
//         if(index1 == index2 && index2 == index3){
//             console.log("You win")
//             break
//         }
//         else if(!gameTable.includes("") && index1 !== index2 && index2 !== index3){
//             console.log("draw")
//         }
//     }
// }









