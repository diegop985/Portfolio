import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmail } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [ formSubmitted, setformSubmitted ] = useState( false );

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );

  const formValidations = {
    email: [ ( value ) => value.includes( '@' ), 'Email should contain a @' ],
    password: [ ( value ) => value.length >= 6, 'Password must be over 6 characters' ],
    displayName: [ ( value ) => value.length >= 4, 'Name is required' ],
  };

  const { formState, displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();

    setformSubmitted( true );

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmail( formState ) );
  };

  return (
    <AuthLayout title='Create an account'>

      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>

          <Grid item xs={ 12 } md={ 6 } sx={ { mt: 2 } }>
            <TextField
            label="Name"
            type="text"
            placeholder='Jhon Doe'
            fullWidth
            name='displayName'
            value={ displayName }
            onChange={ onInputChange }
            error={ !!displayNameValid && formSubmitted }
            helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } md={ 6 } sx={ { mt: 2 } }>
            <TextField
            label="Email"
            type="email"
            placeholder='email@gmail.com'
            fullWidth
            name='email'
            value={ email }
            onChange={ onInputChange }
            error={ !!emailValid && formSubmitted }
            helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={ 12 } md={ 6 } sx={ { mt: 2 } } >
            <TextField
            label="Password"
            type="password"
            placeholder='Password'
            fullWidth
            name='password'
            value={ password }
            onChange={ onInputChange }
            error={ !!passwordValid && formSubmitted }
            helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={ { mb: 2, mt: 1 } }>

            <Grid item xs={ 12 } sm={ 6 } display={ errorMessage ? '' : 'none' }>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button disabled={ isCheckingAuthentication } type='submit' variant="contained" fullWidth>
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
