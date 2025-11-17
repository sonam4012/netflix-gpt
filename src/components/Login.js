import React, { useState } from 'react'
import Header from './Header'
import './Login.css';

const Login = () => {
    const[isSignInForm, setIsSignInForm]= useState(true);

    const toggleSignInForm = ()=>{
        setIsSignInForm (!isSignInForm)
    }
  return (
    <div>
      <Header/>
      <div className='background-image'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/58622d3e-49bc-482d-8b16-bddc4b672e8e/web/IN-en-20251110-TRIFECTA-perspective_281b0878-5972-49a4-9956-3f0cb5eb039b_medium.jpg"
        alt="background"/>
      </div>
      <form className='form'>
        <h1 className='heading'>
            {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        { !isSignInForm && (
        <input type="text" 
        placeholder='Full Name' 
        className='input-sign'/>
         )}

        <input type="text" 
        placeholder='Email address' 
        className='input'/>

        <input type="password" 
        placeholder='Password' 
        className='input-form'/>

        <button className='button'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='paragraph' onClick={toggleSignInForm}>{isSignInForm ? 
        "New to Netflix? Sign Up Now" : 
        "Already registered? Sign In Now."}</p>
      </form>
    </div>
  )
}

export default Login
