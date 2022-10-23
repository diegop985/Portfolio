/* eslint-disable no-unused-vars */
import { async } from '@firebase/util';
import { signInWithGoogle, registerUserEmail, loginWithEmail, logOutFirebase } from '../../firebase/providers';
import { clearNoteLogOut } from '../journal/journalSlice';
import { checkingCredentials, logIn, logOut } from './authSlice';

export const checkingAuthentication = ( email, password ) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );
  };
};

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await signInWithGoogle();
    if ( !result.ok ) return dispatch( logOut( result.errorMessage ) );

    dispatch( logIn( result ) );
  };
};

export const startCreatingUserWithEmail = ( { email, password, displayName } ) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserEmail( { email, password, displayName } );

    if ( !ok ) return dispatch( logOut( { errorMessage } ) );

    dispatch( logIn( { uid, displayName, email, photoURL } ) );
  };
};

export const startLoginWithEmail = ( { email: correo, password } ) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );

    const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmail( { correo, password } );

    if ( !ok ) return dispatch( logOut( { errorMessage } ) );

    dispatch( logIn( { ok, uid, displayName, photoURL } ) );
  };
};

export const startLogOutFirebase = () => {
  return async ( dispatch ) => {
    await logOutFirebase();
    dispatch( clearNoteLogOut() );
    dispatch( logOut( { } ) );
  };
};
