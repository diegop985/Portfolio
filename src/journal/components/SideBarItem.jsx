/* eslint-disable react/prop-types */
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ( { title, body, id, date, imageURLs = [] } ) => {
  const dispatch = useDispatch();

  const newTitle = useMemo( () => {
    return title.length > 17 ? title.substring( 0, 17 ) + '...' : title;
  }, [ title ] );

  const NoteActive = {
    title,
    body,
    date,
    imageURLs,
    id,
  };

  const setActiveNoteOnClick = () => {
    dispatch( setActiveNote( NoteActive ) );
  };

  return (
  <ListItem disablePadding onClick={ setActiveNoteOnClick }>
    <ListItemButton>
      <ListItemIcon>
        <TurnedInNot/>
      </ListItemIcon>
      <Grid container direction="column">
        <ListItemText primary={ newTitle }/>
        <ListItemText secondary={ body }/>
      </Grid>
    </ListItemButton>
  </ListItem>
  );
};
