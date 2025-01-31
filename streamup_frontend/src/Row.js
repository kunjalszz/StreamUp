import React, { useEffect, useState } from 'react'
import axios from './axios';
import "./Row.css"

const posterBaseUrl="https://image.tmdb.org/t/p/original/";
function Row({title,fetchUrl,isLargeRow}) {
    const [movies, setMovies]=useState([]);
    
    //getting url
    useEffect(()=>{
        async function fetchData() {
            const request=await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            return request;     
        }
        fetchData();
    },[fetchUrl]);

    // console.log(movies);

  return (
    <div className="row"> 
        <h4>{title}</h4>
        <div className="posters" >
            {
                movies.map(movie=>(
                    <img 
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}

                     src={`${posterBaseUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name}/>
                ))
            }

        </div>
         
      
    </div>
  )
}

export default Row
