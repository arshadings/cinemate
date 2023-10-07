import React, { useState } from 'react';
import logo from '../assets/logo.png';
import thirdSection_image from '../assets/thirdSection_image.png'
import fourthSection_image from '../assets/fourthSection_image.png';
import './LoginScreen.css';
import SignupScreen from './SignupScreen';
import { FaChevronRight } from "react-icons/fa";
import { VscAdd } from 'react-icons/vsc';
import { RxCross1 } from 'react-icons/rx';
import { FaHeart } from 'react-icons/fa';

function LoginScreen() {

    const [signIn, setSignIn] = useState(false); 
    const [show, setShow] = useState(false);
    const [whichone, setWhichone] = useState(null);
    const [email, setEmail] = useState('')
    let count = 1;
    const plus = <VscAdd className='faqSection__plusIcon'/>;
    const cross = <RxCross1 className='faqSection__plusIcon'/>;

    const data = [
        {
            id: 1,
            question: "What is Cinemate?",
            questionDescription: "Cinemate is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.\n\n You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
        },
        {
            id: 2,
            question: "How much does Cinemate cost?",
            questionDescription: "Watch Cinemate on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts."
        },
        {
            id: 3,
            question: "Where can I watch?",
            questionDescription: "Watch anywhere, anytime. Sign in with your Cinemate account to watch instantly on the web at Cinemate.com from your personal computer or on any internet-connected device that offers the Cinemate app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\n You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Cinemate with you anywhere."
        },
        {
            id: 4,
            question: "How do I cancel?",
            questionDescription: "Cinemate is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
        },
        {
            id: 5,
            question: "What can I watch on Cinemate?",
            questionDescription: "Cinemate has an extensive library of feature films, documentaries, TV shows, anime, award-winning Cinemate originals, and more. Watch as much as you want, anytime you want."
        },
        {
            id: 6,
            question: "Is Cinemate good for kids?",
            questionDescription: "The Cinemate Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.\n\n Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
        }
    ]

    function showDescription(id) {
        console.log('clicked on: ', id)
        setWhichone(id);
        setShow(!show)
    }

  return (
    <div>
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
                        <SignupScreen email={ email }/>
                    ) : (
                        <>
                            <div className='loginScreen__main'>
                                <h1>Laughter. Tears. Thrills. Find it all on Cinemate.</h1>
                                <h2>Endless entertainment starts at just ₹ 149. Cancel anytime.</h2>
                                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                                <div className='loginScreen__input'>
                                    <form>
                                        <input 
                                            type='email'
                                            placeholder='Email address'
                                            id='email'
                                            onChange={ (e) => setEmail(e.target.value) }
                                        />
                                        
                                        <button className='loginScreen__getStarted' onClick={ () => setSignIn(true) }>
                                            Get Started <span><FaChevronRight className='loginScreen__getStartedIcon' /></span>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className='loginScreen__content'>
                                <div className='firstSection'>
                                    <div className='firstSection__left'>
                                        <h2 className='cardHeading'>Enjoy on your TV</h2>
                                        <p className='cardDescription'>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                                    </div>    
                                    <div className='firstSection__right'>
                                        <img src='https://www.curvedview.com/wp-content/uploads/2016/04/3d-tv-watching-movies-gaming-1024x676.jpg' alt='Movie in TV' />
                                    </div>    
                                </div>

                                <div className='secondSection'>
                                        <div className='secondSection__left'>
                                            <h2 className='cardHeading'>Download your shows to watch offline</h2>
                                            <p className='cardDescription'>Save your favourites easily and always have something to watch.</p>
                                        </div>  
                                        <div className='secondSection__right'>
                                            <img src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg' alt='Download and watch offline' />
                                        </div>      
                                </div>

                                <div className='thirdSection'>
                                    <div className='thirdSection__left'>
                                        <h2 className='cardHeading'>Watch everywhere</h2>
                                        <p className='cardDescription'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                                    </div>    
                                    <div className='thirdSection__right'>
                                        <img src={ thirdSection_image } alt='Watch Anywhere, Anytime' />
                                    </div>   
                                </div>

                                <div className='fourthSection'>
                                    <div className='fourthSection__left'>
                                        <h2 className='cardHeading'>Create profiles for kids</h2>
                                        <p className='cardDescription'>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</p>
                                    </div>    
                                    <div className='fourthSection__right'>
                                        <img src={ fourthSection_image } alt='Watch Anywhere, Anytime' />
                                    </div>   
                                </div>

                                <div className='faqSection'>
                                    <div className='faqSection__container'>
                                        <div className='faqSection__content'>
                                            <h2>Frequently Asked Questions</h2>
                                            <div className='faqSection__questions'>
                                                <ul className='faqSection__unlist'>
                                                {
                                                    data.map( (item) => (
                                                        <li className='faqSection__list' key={item.id} id={ count++ } onClick={ () => showDescription(item.id) }>
                                                            <h3>
                                                                <button className='faqSection__button' >
                                                                    <span className='faqSection__question'>{ item.question }</span>
                                                                    {
                                                                        (whichone === item.id) && show ? cross : plus    
                                                                    }
                                                                </button>
                                                                
                                                            </h3>
                                                            {
                                                                (whichone === item.id) && show &&
                                                                <p className='description__section pre-line'>
                                                                    { item.questionDescription }
                                                                </p>
                                                                
                                                            } 
                                                        </li>
                                                    ) )
                                                }
                                                </ul>

                                                <div className='loginSection__bottomContainer'>
                                                    <div className='loginSection__bottomholder'>
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
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                    </div> 
                                </div>

                                <footer className='loginScreen__footer'>
                                    <div className='loginScreen__footerText'>
                                        By Arshad with love <FaHeart className='heartIcon'/>
                                    </div>
                                </footer>
                            </div>
                        </>
                    )} 
                </div>
            </div>
            
        </div> 


    </div>
  )
}

export default LoginScreen