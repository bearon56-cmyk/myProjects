import { Carousel } from './Carousel';
import { useState, useEffect, useRef } from 'react'
import { MovieCard } from './MovieCard';


function App() {
  const [movies, setMovies] = useState([])
  const [moviesPopular, setMoviesPopular] = useState([])
  const socketRef = useRef(null)

    async function fetchMovie() {
    try {
      const moviesResponse = await fetch("http://localhost:3000/api/movies")
      const moviesPopularResponse = await fetch("http://localhost:3000/api/moviesPopular")
      const moviesJson = await moviesResponse.json()
      const moviesPopularJson = await moviesPopularResponse.json()
      setMovies(moviesJson)
      setMoviesPopular(moviesPopularJson)

      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    const controller = new AbortController
    const {signal} = controller

    fetchMovie()

    socketRef.current = new WebSocket('ws://localhost:3000')
    return ()=>{
      controller.abort()
    }
  }, [])

  async function onclick(idPassed){
    let newVoteCount = movies[idPassed].vote_count + 1

    const request = {
      action: "CHANGE VOTE",
      vote_countPassed : newVoteCount,
      id: movies[idPassed]._id
    }
    // Request sending
    socketRef.current.send(JSON.stringify(request))

    // Edit vote_count
    setMovies(movies.map((movie, index) => {
    if (index === idPassed) {
      return { ...movie, vote_count: newVoteCount }
    }
    return movie
  }))
    
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
