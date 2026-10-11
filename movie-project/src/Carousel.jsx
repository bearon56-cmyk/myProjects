import React, { use } from "react";
import { MovieCard } from './MovieCard';
import { useRef, useEffect, useState } from 'react'
export function Carousel({
  moviesProps,
  categoryPassed
}) {
  const carouselRef = useRef(null)
  const [movies, setMovies] = useState([])

    useEffect(()=>{
      let newArray = [...moviesProps]
      function shuffle(array){
        for (let i = array.length - 1; i > 0; i--) {
          let random = Math.floor(Math.random() * (i + 1));

          [array[i], array[random]] = [array[random], array[i]] 
        }
        return array
      }

    const result = shuffle(newArray)
    setMovies(result)
    }, [moviesProps])



    function onNextClick(){
    if(carouselRef.current){
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      })
    }
  }
  function onPrevClick(){
    if(carouselRef.current){
      carouselRef.current.scrollBy({
        left:-300,
        behavior: 'smooth'
      })
    }
  }



  return <>
      <p className='ml-5 mb-1 mt-5 font-bold'>{categoryPassed}</p>
      <div id='carousel' ref={carouselRef} className='self-center w-full overflow-hidden flex h-fit gap-5 '>
          {movies.map((value, index) => {
        return <MovieCard key={index} value={value} />;})}
        <button className='absolute left-0 mt-20 w-16 h-6' onClick={onPrevClick}>Previous</button>
        <button className='absolute right-0 mt-20 w-16 h-6' onClick={onNextClick}>Next</button>
      </div>

      </>;
}
  