import { Carousel } from './Carousel';

import { useState, useEffect, useRef } from 'react'

function App() {
  const [movies, setMovies] = useState([])


  useEffect(()=>{
    async function fetchMovie() {
    try {
      const response = await fetch("http://localhost:3000/api/movies")
      const data = await response.json()
      setMovies(data)
    } catch (error) {
      console.error(error)
    
    }
  }
  fetchMovie()
  }, [])



  return (
    <>
    <div className='flex flex-col justify-center w-[90%] h-[95%] overflow-scroll'>

  

      <Carousel movies={movies} categoryPassed={"Trending"} />
      <Carousel movies={movies}  categoryPassed={"Voted"}/>
      <Carousel movies={movies}  categoryPassed={"Loved"}/>
      <Carousel movies={movies}  categoryPassed={"You might like"}/>
     </div>
    </>
  )
}

export default App
