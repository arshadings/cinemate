import React from 'react';
import './ProfileScreen.css';
import Nav from '../Nav';
import avatar from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import PlansScreen from './PlansScreen';

function ProfileScreen() {

    const user = useSelector(selectUser)

  return (
    <div className='profileScreen'>
        <Nav />
        <div className='profileScreen__body'>
            <h1>Subscription details</h1>
            <div className='profileScreen__info'>
                <img src={avatar} alt='avatar' />
                <div className='profileScreen__details'>
                    <h2>Your email id: {user.email}</h2>
                    <div className='profileScreen__plans'>
                        <p className='profileScreen__plansHeading'>Plans</p>
                        
                        <PlansScreen />
                        <button 
                            className='profileScreen__signOut' 
                            onClick={ () => auth.signOut() }
                        >Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen