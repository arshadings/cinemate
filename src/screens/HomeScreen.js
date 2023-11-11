import React from 'react';
import Banner from '../Banner';
import './HomeScreen.css';
import Nav from '../Nav';
import requests from '../Requests';
import Row from '../Row';

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      
      <Banner />

      <Row 
        title='CINEMATE ORIGINALS'
        fetchURL={requests.fetchCinemateOriginals}
        isLargeRow
      />
      <Row title='Upcoming Movies' fetchURL={requests.fetchUpcoming} />
      <Row title='Top Rated' fetchURL={requests.fetchTopRated} />
      <Row title='Drama Movies' fetchURL={requests.fetchDramaMovies} />
      <Row title='Action Movies' fetchURL={requests.fetchActionMovies} />
      <Row title='Family Movies' fetchURL={requests.fetchFamilyMovies} />
      <Row title='Adventure Movies' fetchURL={requests.fetchAdventureMovies} />
      <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
      <Row title='Horror Movies' fetchURL={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchURL={requests.fetchRomanceMovies} />
      <Row title='History Movies' fetchURL={requests.fetchHistoryMovies} />
      <Row title='Sci-Fi Movies' fetchURL={requests.fetchScienceFictionMovies} />
      <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies} />
    </div>
  )
}

export default HomeScreen
