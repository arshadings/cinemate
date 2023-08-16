import React, { useEffect, useState } from 'react';
import './Nav.css';
import logo from './assets/logo.png';
import avatar from './assets/avatar.png';
import { useNavigate } from 'react-router-dom';

function Nav() {

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

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__contents'>
        <img 
            onClick={ () => navigate('/') }
            className='nav__logo'
            src={ logo } 
            alt='Cinemate logo' 
          />

          <img 
            onClick={ () => navigate('/profile') }
            className='nav__avatar'
            src={ avatar }
            alt='avatar' 
          />
      </div>
    </div>
  )
}

export default Nav
