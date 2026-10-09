import React from "react";
import { MovieCard } from './MovieCard';
import { useRef } from 'react'
export function Carousel({
  movies,
  categoryPassed
}) {
  const carouselRef = useRef(null)

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
      <p className='ml-5 mb-5 font-bold'>{categoryPassed}</p>
      <div id='carousel' ref={carouselRef} className='self-center w-full overflow-x-auto scrollbar-none overflow-hidden scroll-smooth flex h-fit gap-5 '>
          {movies.map((value, index) => {
        return <MovieCard key={index} value={value} />;})}
        <button className='absolute left-0' onClick={onPrevClick}>Previous</button>
        <button className='absolute right-0' onClick={onNextClick}>Next</button>
      </div>
      </>;
}
  