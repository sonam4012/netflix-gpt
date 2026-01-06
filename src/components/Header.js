import React ,{useEffect} from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
    const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(store => store.user);

    const handleSignOut = ()=>{
        signOut(auth).then(() => {})
        .catch((error) => {
         navigate('/error')
          });
    };

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const {uid, email, displayName, photoURL} = user;
        dispatch(
            addUser({
                uid: uid, 
                email: email, 
                displayName: displayName, 
                photoURL: photoURL,
            })
        );
        navigate("/browse");
        
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });
},[])

  return (
    <div className='logo'>
      <img  className='image' src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt = "logo"/>

      {user && (
         <div className='usericon'>
        <img  className="user" alt = "usericon" 
        src={user?.photoURL}/>
        <button onClick={handleSignOut} className="button-icon">(Sig Out)</button>
      </div>
      )}
    </div>
  )
}

export default Header
