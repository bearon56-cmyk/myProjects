function Box({onclick, board}){
    return (
    
    <div className='grid grid-cols-3 grid-rows-3 w-50 h-50 border items-center'>
        {/* <div className='w-full h-full flex justify-center items-center border' onClick={onclick}>{playerState}</div> */}
        {board.map((element, index) => {
            return (<div key={index} className='hover:cursor-pointer w-full h-full flex justify-center items-center border' onClick={ ()=>onclick(index)}>{element}</div>)
        })}
      </div>
    )
}

export default Box