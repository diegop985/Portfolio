import { createSlice } from '@reduxjs/toolkit';

export const sideBarSlice = createSlice( {
  name: 'sideBar',
  initialState: {
    isOpen: false,
    isClosed: false,
  },
  reducers: {
    setClosed: ( state ) => {
      state.isOpen = false;
      state.isClosed = true;
    },
    setOpen: ( state ) => {
      state.isOpen = true;
      state.isClosed = false;
    },
  },
} );

// Action creators are generated for each case reducer function
export const { setClosed, setOpen } = sideBarSlice.actions;
