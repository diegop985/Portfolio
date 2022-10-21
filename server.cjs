/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const PORT = 8000;
const express = require( 'express' );
const cors = require( 'cors' );
const axios = require( 'axios' );

require( 'dotenv' ).config;

const app = express();

app.get( '/', ( req, res ) => {
  res.json( 'Hi' );
} );

app.get( '/keys', ( req, res ) => {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

  axios.request( firebaseConfig ).then( ( response ) => {
    console.log( response.data );
  } );
} );

app.listen( PORT, () => console.log( 'server is running on port 8000' ) );
