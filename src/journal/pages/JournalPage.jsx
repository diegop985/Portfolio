import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JounalLayout } from '../layout/JounalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
  return (
    <JounalLayout>
      { /* <NothingSelectedView/> */ }
      <NoteView/>

      <IconButton size='large' sx={ { color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.7 }, position: 'fixed', bottom: 50, right: 50 } }>

        <AddOutlined sx={ { fontSize: 30 } }/>

      </IconButton>
    </JounalLayout>
  );
};
