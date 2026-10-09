import React, { useState } from "react";
export function MovieCard({
  value,
}) 

{
  const [loaded, setLoaded] = useState(false)
  return (<div id="movieCard" className='h-40 border items-center justify-center'>
            {!loaded && (<div className="absolute">Loading...</div>) }
            <img className={`w-full h-full ${!loaded ? 'opacity-0' : 'opacity-100'}`} loading="lazy" onLoad={()=>setLoaded(true)} src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`} alt="" />
          </div>
          )
}
  