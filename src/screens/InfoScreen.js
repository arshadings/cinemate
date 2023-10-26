import './InfoScreen.css';
import Nav from '../Nav';
import axios from '../axios'

import React, { useEffect, useState } from 'react'

function InfoScreen() {

    const url = window.location.pathname;
    const movieId = url.slice(9)

    const [movieInfo, setMovieInfo] = useState([])

    const API_KEY = '520e6628ccca02a1350a7f518496d2e4';

    let fetchURL = `/movie/${movieId}?api_key=${API_KEY}`;
    const baseURL = "https://image.tmdb.org/t/p/original/";

    useEffect( () => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            console.log('request in info', request)
            setMovieInfo(request.data)
            return request;
        }
        fetchData();
    }, [fetchURL] )

    console.log('movies in info screen', movieInfo)



  return (
    <div className='InfoScreen__body'>
      <Nav />
      <div className='InfoScreen__container'>
        <h3>This is InfoScreen</h3>
        <img 
          className={`row__poster`}
          key={movieInfo.id}
          src={`${baseURL}${
          movieInfo.backdrop_path
          }`} 
          alt={movieInfo.title} 
        />


      </div>
      
    </div>
  )
}

export default InfoScreen
