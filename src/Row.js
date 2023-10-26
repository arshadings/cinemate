import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import { GoPlay } from "react-icons/go";
import { FiInfo } from "react-icons/fi";

function Row({title, fetchURL, isLargeRow = false}) {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate()
    const baseURL = "https://image.tmdb.org/t/p/original/";

    useEffect( () => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchURL] )

  //console.log('movies in Row.js: ', movies);

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row__posters'>
        {movies.map( 
            (movie) => 
                (( isLargeRow && movie.poster_path ) ||
                (!isLargeRow && movie.backdrop_path)) && (
                  <div className='row__posterDetails'>
                    
                      <img 
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        key={movie.id}
                        src={`${baseURL}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} 
                        alt={movie.title} 
                      />

                      <div className='container'>
                        <div className='playButton' onClick= { () => navigate(`/trailer/${movie.id}`) }>
                          <GoPlay style={{margin: "-2px 5px"}}/><span >Play</span>
                        </div>
                        <div className='playButton'onClick={ () => navigate(`/details/${movie.id}`) } >
                          <FiInfo style={{margin: "-2px 5px"}}/><span >Info</span>
                        </div>
                      </div>
                    
                    
                    
                    {/* <div className='row__movieDetails'>
                      {
                        isLargeRow ? <p className='row__movieName'>{movie.name}</p> : <p className='row__movieName'>{movie.title}</p>
                      }
                      <p>{movie.first_air_date}</p>
                      <p><span><AiFillStar className='row__startIcon' /></span>{movie.vote_average}</p>
                    </div> */}
                  </div>
                )
          )
        }
      </div>
    </div>
  )
}

export default Row
