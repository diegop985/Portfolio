import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ImageGallery } from '../components';

export const NoteActive = () => {
  const { active } = useSelector( state => state.journal );
  const { title, body, date, imageURLs } = active;

  return (
      <Grid className="animate__animated animate__fadeIn animate__faster" container direction="row" justifyContent="space-between" alignItems="center" sx={ { mb: 1 } }>
        <Grid item>
          <Typography fontSize={ 39 } fontWeight="light">{ date }</Typography>
        </Grid>

      <Grid item>
        <Button color="primary" sx={ { padding: 2 } }>
          <SaveOutlined sx={ { fontSize: 30, mr: 1 } }/>
          Guardar
        </Button>
      </Grid>

      <Grid container direction="column">
        <Typography fontSize={ 39 } fontWeight="bold"
          sx={ { border: 'none', mb: 1, mt: 2 } }
        >{ title }</Typography>

        <Typography fontSize={ 35 } fontWeight="light"
          sx={ { border: 'none', mb: 6 } }
        >{ body }</Typography>
      </Grid>

      <ImageGallery/>

      </Grid>
  );
};
