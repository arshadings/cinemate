import React, { useEffect, useState } from 'react';
import './Nav.css';
import logo from './assets/logo.png';
import avatar from './assets/avatar.png';
import { useNavigate } from 'react-router-dom';

function Nav({subscription}) {

  //console.log('role is: ', subscription)

  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  const transitionNavBar = () => {
    if(window.scrollY > 100){
      setShow(true)
    }
    else {
      setShow(false)
    }
  };

  useEffect( () => {
    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener('scroll', transitionNavBar)
  }, [] )

  const handleNavigation = () => {
    navigate('/')
  }

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__contents'>
        <img 
            onClick={ handleNavigation }
            className='nav__logo'
            src={ logo } 
            alt='Cinemate logo' 
            title='Home'
          />

          <img 
            onClick={ () => navigate('/profile') }
            className='nav__avatar'
            src={ avatar }
            alt='avatar' 
            title='Profile'
          />
      </div>
    </div>
  )
}

export default Nav
