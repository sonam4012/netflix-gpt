import React, { useRef, useState } from 'react'
import Header from './Header'
import './Login.css';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    const handleButtonClick = () => {
        //validate the form data
        //useref is used to refrance the tag.
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                         photoURL: "https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg"
                      }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid, 
                                    email: email, 
                                    displayName: displayName, 
                                    photoURL: photoURL
                                })
                            );
                        
                      }).catch((error) => {
                        setErrorMessage(error.message);
                      });
                    
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        }
        else {
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log(user)
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div>
            <Header />
            <div className='background-image'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/58622d3e-49bc-482d-8b16-bddc4b672e8e/web/IN-en-20251110-TRIFECTA-perspective_281b0878-5972-49a4-9956-3f0cb5eb039b_medium.jpg"
                    alt="background" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='form'>
                <h1 className='heading'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input type="text"
                        placeholder='Full Name'
                        className='input-sign' />
                )}

                <input
                    ref={email}
                    type="text"
                    placeholder='Email address'
                    className='input' />

                <input
                    ref={password}
                    type="password"
                    placeholder='Password'
                    className='input-form' />
                <p className='error'>{errorMessage}</p>

                <button className='button' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='paragraph' onClick={toggleSignInForm}>{isSignInForm ?
                    "New to Netflix? Sign Up Now" :
                    "Already registered? Sign In Now."}</p>
            </form>
        </div>
    )
}

export default Login
