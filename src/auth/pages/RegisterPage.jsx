import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Create an account'>

      <form>
          <Grid container>

          <Grid item xs={ 12 } md={ 6 } sx={ { mt: 2 } }>
            <TextField
            label="Name"
            type="text"
            placeholder='Jhon Doe'
            fullWidth
            />
          </Grid>

          <Grid item xs={ 12 } md={ 6 } sx={ { mt: 2 } }>
            <TextField
            label="Email"
            type="email"
            placeholder='email@gmail.com'
            fullWidth
            />
          </Grid>

          <Grid item xs={ 12 } md={ 6 } sx={ { mt: 2 } } >
            <TextField
            label="Password"
            type="password"
            placeholder='Password'
            fullWidth
            />
          </Grid>

          <Grid container spacing={ 2 } sx={ { mb: 2, mt: 1 } }>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button variant="contained" fullWidth>
                Create Account
              </Button>
            </Grid>

          </Grid>

            <Grid container direction="row" justifyContent="end">

              <Typography sx={ { mr: 1 } }>Already Registered?</Typography>
              <Link component={ RouterLink } to="/auth/login/">

                Sign in

              </Link>
            </Grid>

          </Grid>

        </form>

    </AuthLayout>
  );
};
