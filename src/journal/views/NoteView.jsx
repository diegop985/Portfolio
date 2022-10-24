import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
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
    const dTime = newDate.toLocaleTimeString().replace( /(.*)\D\d+/, '$1' );
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormated = ` ${newDate.toLocaleDateString( 'en-US', options )} ${dTime} `;
    return dateFormated;
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
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={ { mb: 3 } }
          >

          <Grid item sm={ 12 } md={ 6 }>
              <Typography fontSize={ '1.2rem' } fontWeight="light">{ dateString }</Typography>
          </Grid>

          <Grid item sm={ 12 } md={ 6 } lg={ 6 } >
            <Grid container
                  alignItems="center"
                  direction="row"
                  justifyContent="flex-start"
                  >

            <input ref={ fileInputRef } type="file" multiple onChange={ onFileInputchange } style={ { display: 'none' } }/>

            <Grid item md={ 3 }>
              <Button onClick={ onDelete } disabled={ isSaving } color="error">
                <DeleteOutline/>
                <Box sx={ { display: { sm: 'none', md: 'block' } } }><Typography>Borrar</Typography></Box>
              </Button>
            </Grid>

            <Grid item md={ 5 }>
              <Button onClick={ () => fileInputRef.current.click() } color='primary' disabled={ isSaving } sx={ { padding: 2 } }>
                <UploadOutlined/>
                <Box sx={ { display: { sm: 'none', md: 'block' } } }><Typography>Upload Image</Typography></Box>
              </Button>
            </Grid>

            <Grid item md={ 3 }>
                <Button disabled={ isSaving } onClick={ onSaveNote } color="primary" sx={ { padding: 2 } }>
                <SaveOutlined />
                <Box sx={ { display: { sm: 'none', md: 'block' } } }><Typography>Guardar</Typography></Box>
              </Button>
            </Grid>
            </Grid>
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
