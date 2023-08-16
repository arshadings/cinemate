import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './LoginScreen.css';
import SignupScreen from './SignupScreen';
import { FaChevronRight } from "react-icons/fa";




function LoginScreen() {

    const [signIn, setSignIn] = useState(false); 

  return (
    <div className='loginScreen'>
        <div className='loginScreen__background'>
            <img
                className='loginScreen__logo' 
                src={ logo } 
                alt='LoginScreen Background' 
            />
            <button className='loginScreen__button' onClick={ () => setSignIn(true) }>
                Sign in
            </button>

            <div className='loginScreen__gradient' />
            
                
            <div className='loginScreen__body'>

                {signIn ? (
                    <SignupScreen />
                ) : (
                    <>
                    <h1>Unlimited movies, TV shows and more</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className='loginScreen__input'>
                        <form>
                            <input 
                                type='email'
                                placeholder='Email address'
                                id='email'
                            />
                             
                            <button className='loginScreen__getStarted' onClick={ () => setSignIn(true) }>
                                Get Started <span><FaChevronRight className='loginScreen__getStartedIcon' /></span>
                            </button>
                        </form>
                    </div>
                </>
                )}

                
            </div>
        </div>
    </div>
  )
}

export default LoginScreen