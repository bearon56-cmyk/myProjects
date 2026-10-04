import { useState } from 'react'
import Box from './Box'



function App() {
  let [boardArray, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  let [gameState, setGameState] = useState(true)
  let [move, setMove] = useState([])
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


  let [playerState, setPlayerState] = useState("X")

  function onclick(index){
    if(gameState == false){
      return
    }
    else{
      if(boardArray[index] !== ""){
        return;
      }
      {
        (playerState === "X" ) ? setPlayerState("O") : setPlayerState("X")
      }
      let newBoard = boardArray
      newBoard[index] = playerState
      
      setBoard(newBoard)
      console.log(newBoard)
      setMove([...move, [...newBoard]])

      checkWin(boardArray)


    }

  }

  function onmoveclick(index){
    setGameState(true)
    let updatedMove= move.filter((value, i) => i <= index)
    setMove(updatedMove)
    setBoard(move[index])

  }

  function checkWin(board){
    for (let i = 0; i < winningSequence.length; i++) {
      const element = winningSequence[i];
      let index1 = element[0]
      let index2 = element[1]
      let index3 = element[2]

      if(board[index1] !== "" && board[index1] == board[index2] && board[index2] == board[index3]){
        setGameState(false)
        alert("you win")
        return

      }
      else{
        continue
      }
      }
      if(!board.includes("")){
      setGameState(false)
      alert("Draw!")
    }
  }
        // setBoard(["", "", "", "", "", "", "", "", ""])

  return (
    <>
    <Box onclick={onclick} board={boardArray}></Box>
    
    <div className='w-40 min-h-10 border relative bottom-15 ml-10 flex flex-col'>
      {move.map((element, index)=>{
        return <div key={index}>
          <p>Move {index}</p>
          <button onClick={()=>onmoveclick(index)}>Go to this move</button>
        </div>
      })}
      {gameState == false ? (
        <div>
          <p>Restart?</p>
          <button onClick={()=>{
            setBoard(["", "", "", "", "", "", "", "", ""])
            setMove([])
            setGameState(true)
          }}>Go to this move</button>
        </div>) : null
        }
    </div>

    </>
  )
}

export default App
