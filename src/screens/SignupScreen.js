import React, { useRef, useState } from 'react';
import { auth } from '../firebase';
import './SignupScreen.css';
import { ImSpinner11 } from "react-icons/im";

function SignupScreen({ email }) {

    const [emailId, setEmailId] = useState('')
    const [spin, setSpin] = useState(false)

    console.log("email: ", email);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        } ).catch( (error) => {
            alert('Please enter valid email and  new password and click on Sign Up now.')
        } )
    }

    const signIn = (e) => {
        setSpin(true)
        e.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then( (authUser) => {
            console.log("before authUser")
            console.log(authUser)
            console.log("after authUser")
            setSpin(false)
        } ).catch( (error) => {
            alert(error.message);
            setSpin(false)
        } )
    }

  return (
    <div className='signupScreen'>
        <form>
            <h1>Sign In</h1>
            <input type='email' ref={emailRef} className='email' placeholder='Email' value={ email ? email : emailId } onChange={(e) => setEmailId(e.target.value)}/>
            <input type='password' ref={passwordRef} className='password' placeholder='Password' />
            <button type='submit' onClick={signIn} className={`${spin && 'button__fade'}`}>Sign In 
            {
                spin && <ImSpinner11 style={{margin: "-2px 10px"}} className='icon__spinner'/>
            }
            </button>
            <h4>
                <span className='signupScreen__gray'>New to Cinemate? </span>
                <span className='signupScreen__link' onClick={register}> Sign Up now.</span>
            </h4>
        </form>
    </div>
  )
}

export default SignupScreen