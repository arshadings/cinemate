import './InfoScreen.css';
import Nav from '../Nav';
import axios from '../axios';
import { GoPlay } from "react-icons/go";

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function InfoScreen() {

    const url = window.location.pathname;
    const movieId = url.slice(9)

    const [movieInfo, setMovieInfo] = useState([])
    const [certificate, setCertificate] = useState('')
    const [duration, setDuration] = useState('')
    const [genres, setGenres] = useState([])
    const [lang, setLang] = useState('')
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    //const [selected, setSelected] = useState('')
    //const [images, setImages] = useState([])

    const API_KEY = '520e6628ccca02a1350a7f518496d2e4';

    let fetchURL = `/movie/${movieId}?api_key=${API_KEY}&append_to_response=images,release_dates,credits&include_image_language=en,null`;
    const baseURL = "https://image.tmdb.org/t/p/original/";

    useEffect( () => {
        async function fetchData() {
          setLoading(true)
            const request = await axios.get(fetchURL);
            setMovieInfo(request.data)
            setCertificate(request.data.release_dates.results)
            setGenres(request.data.genres)
            setLang(request.data.spoken_languages[0].english_name);
            setCast(request.data.credits.cast)
            setLoading(false)
            //setImages(request.data.images.backdrops)
            return request;
        }
        fetchData();

        function NumToTime(num) { 
          var hours = Math.floor(num / 60);  
          var minutes = num % 60;
          if (minutes + ''.length < 2) {
            minutes = '0' + minutes; 
          }
          setDuration(hours+"h"+" "+minutes+"m")
        }
        NumToTime(movieInfo.runtime)
        

    }, [fetchURL, movieInfo.runtime] )
    console.log('movieInfo in info screen', movieInfo)
    //console.log('certificate is: ', certificate)
    
    let releaseYear = '';
    (movieInfo.length !== 0 ) && (
      releaseYear = movieInfo.release_date.slice(0,4)
    )

    let selected = [];

    if( certificate.length === 1 ) {
      selected = Object.values(certificate)[0].release_dates[0].certificate
    }

    if( certificate!=='' && certificate.length !== 1 ){
      selected = Object.values(certificate).find(e => e.iso_3166_1 === 'US').release_dates[0].certification
      //console.log('selected is: ', selected)
      if( selected === '' ){
        selected = 'General'
        //console.log('selected is set to ', selected)
      }
    }

    let rating = movieInfo.vote_average;
    if( rating === 0 ) {
      rating = 'NA';
    }

    let budget = movieInfo.budget;
    if( budget === 0 ) {
      budget = 'NA'
    }

    


  
    // if( selected !== '' ){
    //   cert = Object.values(selected).find(e => e.certification !== '').certification 
    //   if( cert === '' ){
    //     cert = 'General'
    //   }
    //   console.log('cert is: ', cert)
    // }


      
    
    
    //console.log('images: ', images)
  return (
    <div className='InfoScreen__body'>
      <Nav />
      <div className='InfoScreen__container'>
        <div className='InfoScreen__banner'>
          {/* {
            images.map(
              (image) => (
                image.file_path
              ) && (
                <img 
                className='infoScreen__bannerImages'
                  key={image.vote_average+1}
                  src={`${baseURL}${
                    image.file_path
                  }`}
                  alt='Movie Poster'
                />


              )
            )
            }  */
          }

          <img 
            className='infoScreen__bannerImages'
            key={movieInfo.id}
            src={`${baseURL}${
            movieInfo.backdrop_path
            }`} 
            alt={movieInfo.title} 
          />
        </div>
        
      </div>
      <div className='infoScreen__fadeBottom' />

      <div className='infoScreen__details'>
        <h1>{movieInfo.title}</h1>
        <p>{movieInfo.tagline}</p>
        <button className='infoScreen__playButton' onClick= { () => navigate(`/trailer/${movieInfo.id}`) }><GoPlay style={{margin: "-1px 10px -5px 10px", fontSize: "25px"}}/>Play</button>
        <div className='infoScreen__movieSubDetails'>
              <div className='infoScreen__movieSubDetailsItem1'>{ releaseYear }</div><span>|</span>
              <div className='infoScreen__movieSubDetailsItem infoScreen__detailsBorder'>{ selected }</div><span>|</span>
              <div className='infoScreen__movieSubDetailsItem'>{ duration }</div><span>|</span>
              <div className='infoScreen__movieSubDetailsItem'>{ lang }</div>
        </div>
        
        <p className='infoScreen__movieDescription'>{movieInfo.overview}</p>

        <div className='infoScreen__subDetails'>
          <p className='infoScreen__title'>Rating</p>
          {
          (rating !== "NA") ? <p>{ parseFloat(movieInfo.vote_average).toFixed(2) } / 10</p> : <p>Not Available</p>
          }
          
          
          <p>{ movieInfo.vote_count } votes</p>
        </div>

        <div className='infoScreen__subDetails'>
          <p className='infoScreen__title'>Genres</p>
          {
            genres.map(
              (genre) => (
                genre.name
              ) && (
                <span className='infoScreen__genres' key={ genre.id }>{genre.name}</span>
              )
            )
          }
        </div>

        <div className='infoScreen__subDetails'>
          <p className='infoScreen__title'>Budget</p>
          {
            ( movieInfo.budget !== 0 ) ? <p>${ parseFloat( (movieInfo.budget / 1000000) ).toFixed(2) } Million</p> : <p>Not Available</p>
          }
          
        </div>


        <div className='infoScreen__subDetails'>
          <p className='infoScreen__title'>Revenue (appx)</p>
          {
            ( movieInfo.revenue !== 0 ) ? <p>${ parseFloat( (movieInfo.revenue / 1000000) ).toFixed(2) } Million</p> : <p>Not Available</p>
          }
          
        </div>

        <div className='infoScreen__subDetails'>
          <p className='infoScreen__title' >Cast</p>
            <div className='infoScreen__castSection'>
            {
              cast.map(
                (c) => (c.profile_path) && (
                  <div className='infoScreen__castDetails' key={ c.cast_id }>
                    <img 
                      className='infoScreen__castImg'
                      key={ c.cast_id }
                      src={ `${baseURL}${
                        c.profile_path
                      }` }
                      alt='Cast Member'
                    />
                    <p className='infoScreen__castName'>{ c.name }<br /> As <br /><span className='infoScreen__cName'>{ c.character }</span></p>
                  </div>
                )
              )
            }
            </div>
          </div>
        

      </div>
      <div>
        {
          loading && <Loader />
        }
      </div>
    </div>
  )
}

export default InfoScreen
