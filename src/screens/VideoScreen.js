import React, { useEffect, useState } from 'react';
import './VideoScreen.css';
import axios from '../axios';
import YouTube from 'react-youtube';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';

import { AiOutlineClose } from "react-icons/ai";
import Loader from './Loader';


function VideoScreen() {

    const url = window.location.pathname;
    const movieId = url.slice(9)
    //console.log("movieId: ", movieId)

    const API_KEY = '520e6628ccca02a1350a7f518496d2e4';
    let videoURL = `/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;

    const [video, setVideo] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect( () => {
        async function fetchVideos() {
          setLoading(true)
          const videoRequest = await axios.get( videoURL );
          //console.log( "videoRequest: ", videoRequest )
          const resultLength = videoRequest.data.videos.results.length;
          console.log( "length: ", videoRequest.data.videos.results.length) 
          if( resultLength !== 0 )
            setVideo(videoRequest.data)
          else
            setVideo(null)
          console.log('video is: ', videoRequest.data.videos)
          setLoading(false)
          return videoRequest;
        }
        fetchVideos();
    }, [videoURL] )

    const renderTrailer = () => {
        // const check = video.videos.results
        // console.log("check is: ", check)
        let trailer = video.videos.results.find( vid => vid.name === 'Official Trailer' );
        const altTrailer = 
            video.videos.results.find( vid => vid.name === 'Main Trailer' || 'Trailer' || 'Trailer for Thinking XXX' ) || 
            video.videos.results.includes( vid => vid.name === 'Trailer' )
        if(trailer){}
        else
        trailer = altTrailer
        console.log("trailer is: ", trailer)
        return(
            <YouTube 
            videoId={ trailer.key }
            className = { "youtube-container" }
            opts={{
                height: '100%',
                width: '100%'
            }}
            />
        )
    }

  return (
    <div className='head'>
      <div className='navbar'>
      <img src={ logo }  className='logo' onClick={ () => navigate('/') } alt='Cinemate logo'/>
      <img src={ avatar } className='avatar' onClick={ () => navigate('/profile') } alt='Avatar'/>
      </div>
      <div className="video-background" >
        <div className='video__close' onClick={ () => navigate('/') }>
        <AiOutlineClose />
        </div>
          {
            video ? renderTrailer() : <p>Loading...</p>
          }
      </div>

      <div>
        {
          loading && <Loader />
        }
      </div>

    </div>
  )
}

export default VideoScreen
