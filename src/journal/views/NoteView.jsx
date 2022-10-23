import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components';

export const NoteView = () => {
  const dispatch = useDispatch();

  const { active, messageSaved, isSaving } = useSelector( state => state.journal );

  const { body, title, date, onInputChange, imageURLs, formState } = useForm( active );

  const dateString = useMemo( () => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ] );

  useEffect( () => {
    dispatch( setActiveNote( formState ) );
  }, [ formState ] );

  useEffect( () => {
    if ( messageSaved === 'deleted' ) {
      Swal.fire( 'Deleted Succesfully', '', 'info' );
    }
    if ( ( messageSaved.length > 0 ) && ( messageSaved !== 'deleted' ) ) {
      Swal.fire( `${messageSaved} `, ' <br/> Updated Succesfully', 'success' );
    }
  }, [ messageSaved ] );

  const onSaveNote = () => {
    dispatch( startSaveNote() );
  };

  const onFileInputchange = ( { target } ) => {
    if ( target.files === 0 ) return;

    dispatch( startUploadingFiles( target.files ) );
  };

  const onDelete = () => {
    dispatch( startDeletingNote() );
  };

  const fileInputRef = useRef();

  return (
      <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent="space-between" alignItems="center" sx={ { mb: 1 } }>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={ { backgroundColor: 'red', display: 'flex', flexWrap: 'no-wrap' } }>
          <Grid item>
            <Typography fontSize={ 20 } fontWeight="light">{ dateString }</Typography>
          </Grid>

          <input ref={ fileInputRef } type="file" multiple onChange={ onFileInputchange } style={ { display: 'none' } }/>

          <Grid container justifyContent="end">
          <Button onClick={ onDelete } sx={ { mt: 2 } } color="error">
              <DeleteOutline/>
              Borrar
          </Button>

          </Grid>
          <IconButton onClick={ () => fileInputRef.current.click() } color='primary' disabled={ isSaving }>
            <UploadOutlined/>
          </IconButton>

          <Grid item>
            <Button disabled={ isSaving } onClick={ onSaveNote } color="primary" sx={ { padding: 2 } }>
              <SaveOutlined sx={ { fontSize: 30, mr: 1 } }/>
              Guardar
            </Button>
          </Grid>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant='filled'
          fullWidth
          label="Título"
          placeholder="Ingrese un título"
          sx={ { border: 'none', mb: 1 } }
          name="title"
          value={ title }
          onChange={ onInputChange }
        />

        <TextField
          type="text"
          variant='filled'
          fullWidth
          multiline
          label="¿Qué sucedió?"
          placeholder=""
          minRows={ 5 }
          sx={ { border: 'none', mb: 1 } }
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <ImageGallery images={ imageURLs }/>

      </Grid>
  );
};
