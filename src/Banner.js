import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from './axios';
import requests from './Requests';
import { useNavigate } from 'react-router-dom';
import { GoPlay } from "react-icons/go";
import { FiInfo } from "react-icons/fi";

function Banner() {

    const [movie, setMovie] = useState([]);
    const navigate = useNavigate()

    useEffect( () => {
        async function fetchData(){
            const request = await axios.get(requests.fetchUpcoming);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }

        fetchData();
    }, [] );

    

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

  return (
    <header 
        className='banner' 
        style={{ 
            backgroundSize: 'cover',
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button' 
                    onClick= { () => navigate(`/trailer/${movie.id}`) }
                ><GoPlay style={{margin: "-2px 5px"}}/>Play</button>
                <button className='banner__button' onClick={ () => navigate(`/details/${movie.id}`) }><FiInfo style={{margin: "-2px 5px"}}/>Info</button>
            </div>
            <h1 className='banner__description'>
                {truncate( movie?.overview, 250)}
            </h1>
        </div>
        <div className='banner--fadeBottom' />
    </header>
  )
}

export default Banner
