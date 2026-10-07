import { useState, useEffect } from 'react'

function App() {
  const [movies, setMovies] = useState(Array(90).fill(""))

  return (
    <>
    <div className='flex flex-col justify-center w-[90%] h-[95%] overflow-scroll'>
      {/* Front Movie */}
      <div className='self-center w-[95%] border h-60 rounded-2xl mb-5 min-h-[114px]'></div>

      <p className='ml-5 mb-5 font-bold'>Trending</p>
      <div className='self-center w-[95%] grid my-responsive-grid h-fit gap-5 '>
        {movies.map((value, index)=>{
          return <div className='w-full h-40 border flex items-center justify-center'>{index}</div>
        })}
      </div>
     </div>
    </>
  )
}

export default App
