import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice( {
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },
    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updatesNotes: ( state, action ) => {
      state.isSaving = false;
      state.notes = state.notes.map( note => {
        if ( note.id === action.payload.id ) {
          return action.payload;
        }
        return note;
      } );
      state.messageSaved = `${action.payload.title}`;
    },
    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageURLs = [ ...state.active.imageURLs, ...action.payload ];
      state.isSaving = false;
    },
    clearNoteLogOut: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: ( state, action ) => {
      state.isSaving = false;
      state.active = null;
      state.messageSaved = 'deleted';
      state.notes = state.notes.filter( note => note.id !== action.payload ? note.id : '' );
    },
  },
} );

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNoteLogOut,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updatesNotes,
} = journalSlice.actions;
