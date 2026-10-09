import { Carousel } from './Carousel';

import { useState, useEffect, useRef } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const [moviesPopular, setMoviesPopular] = useState([])

  useEffect(()=>{
    async function fetchMovie() {
    try {
      const response = await fetch("http://localhost:3000/api/movies")
      const response2 = await fetch("http://localhost:3000/api/moviesPopular")
      const data = await response.json()
      const data2 = await response2.json()
      setMovies(data)
      setMoviesPopular(data2)
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
      <Carousel movies={moviesPopular}  categoryPassed={"Voted"}/>
      <Carousel movies={movies}  categoryPassed={"Loved"}/>
      <Carousel movies={movies}  categoryPassed={"You might like"}/>
     </div>
    </>
  )
}

export default App
