import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatesNotes } from './journalSlice';

export const startNewNote = () => {
  return async ( dispatch, getState ) => {
    dispatch( savingNewNote() );

    console.log( 'start new note' );

    const { uid } = getState().auth;

    const newNote = {
      title: 'A',
      body: 'b',
      imageURLs: [],
      date: new Date().getTime(),
    };

    const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
    await setDoc( newDoc, newNote );

    newNote.id = newDoc.id;

    dispatch( addNewEmptyNote( newNote ) );
    dispatch( setActiveNote( newNote ) );
  };
};

export const startLoadingNotes = () => {
  return async ( dispatch, getState ) => {
    const { uid } = getState().auth;

    const notes = await loadNotes( uid );
    dispatch( setNotes( notes ) );
  };
};

export const startSaveNote = () => {
  return async ( dispatch, getState ) => {
    dispatch( setSaving() );

    const { uid } = getState().auth;
    const { active } = getState().journal;

    const noteToFireStore = { ...active };
    delete noteToFireStore.id;
    console.log( noteToFireStore );

    const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}` );
    await setDoc( docRef, noteToFireStore, { merge: true } );

    dispatch( updatesNotes( active ) );
  };
};

export const startUploadingFiles = ( files = [] ) => {
  return async ( dispatch ) => {
    dispatch( setSaving() );

    const fileUploadPromises = [];

    for ( const file of files ) {
      fileUploadPromises.push( fileUpload( file ) );
    }

    const photosUrls = await Promise.all( fileUploadPromises );

    console.log( photosUrls );

    dispatch( setPhotosToActiveNote( photosUrls ) );
  };
};

export const startDeletingNote = () => {
  return async ( dispatch, getState ) => {
    dispatch( setSaving() );
    const { uid } = getState().auth;
    const { active } = getState().journal;

    console.log( { uid, active } );

    const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}` );
    const res = await deleteDoc( docRef );

    console.log( res );

    dispatch( deleteNoteById( active.id ) );
  };
};
