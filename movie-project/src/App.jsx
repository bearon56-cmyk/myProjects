import { Carousel } from './Carousel';
import { useState, useEffect, useRef } from 'react'
import { MovieCard } from './MovieCard';


function App() {
  const [movies, setMovies] = useState([])
  const [moviesPopular, setMoviesPopular] = useState([])
  const socketRef = useRef(null)

    async function fetchMovie() {
    try {
      const response = await fetch("http://localhost:3000/api/movies")
      const response2 = await fetch("http://localhost:3000/api/moviesPopular")
      const data = await response.json()
      const data2 = await response2.json()
      setMovies(data)
      setMoviesPopular(data2)
      
      const socket = new WebSocket('ws://localhost:3000')
      socketRef.current = socket
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchMovie()
    const socket = socketRef.current
  }, [])

  function onclick(idPassed){
    const request = {
      action: "CHANGE VOTE",
      vote_count : movies[idPassed].vote_count + 1,
      id: movies[idPassed].id
    }
    socketRef.current.send(JSON.stringify(request))
  }

  return (
    <>

    {/* Voteable */}
    <div className='flex'>
      <MovieCard voteable={true} onclick={()=> onclick(0)} value={movies[0]}></MovieCard>
      <MovieCard voteable={true} onclick={()=> onclick(1)} value={movies[1]}></MovieCard>
      <MovieCard voteable={true} onclick={()=> onclick(2)} value={movies[2]}></MovieCard>
    </div>

    <div className='flex flex-col justify-center w-[90%] h-[95%] overflow-scroll'>
      <Carousel moviesProps={movies} categoryPassed={"Trending"} />
      <Carousel moviesProps={moviesPopular}  categoryPassed={"Favored"}/>
      <Carousel moviesProps={movies}  categoryPassed={"Loved"}/>
      <Carousel moviesProps={movies}  categoryPassed={"You might like"}/>
     </div>
    </>
  )
}

export default App
