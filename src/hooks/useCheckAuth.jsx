import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { logIn, logOut } from '../store/auth/authSlice';

export const useCheckAuth = () => {
  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect( () => {
    onAuthStateChanged( FirebaseAuth, async ( user ) => {
      console.log( user );
      if ( !user ) return dispatch( logOut() );
      const { uid, email, displayName, photoURL } = user;
      dispatch( logIn( { uid, email, displayName, photoURL } ) );
    } );
  }, [ ] );

  return status;
};