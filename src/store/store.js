import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal/journalSlice';
import { sideBarSlice } from './sidebar/sideBarSlice';

export const store = configureStore( {
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    sideBar: sideBarSlice.reducer,
  },
} );
