import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { setClosed } from '../../store/sidebar/sideBarSlice';
import { JounalLayout } from '../layout/JounalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startNewNote() );
    dispatch( setClosed() );
  };
  return (
    <JounalLayout>

      {
        active === null ? <NothingSelectedView/> : <NoteView/>
      }

      <IconButton disabled={ isSaving } onClick={ onClickNewNote } size='large' sx={ { color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.7 }, position: 'fixed', bottom: 50, right: 50 } }>

        <AddOutlined sx={ { fontSize: 30 } }/>

      </IconButton>
    </JounalLayout>
  );
};
