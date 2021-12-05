/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from '@reach/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'modules/redux-store';
import { RegisterData } from 'modules/authentication';
import { useDispatch } from 'react-redux';
import { signUpWithEmailPassword } from 'modules/authentication/redux/userActions';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  photoUrl: File[];
};

const theme = createTheme();

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    console.log(data);
    const file = data.photoUrl.shift();
    if (file === undefined) {
      return;
    }
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, file.name);
    await uploadBytes(imagesRef, file);
    const url = await getDownloadURL(imagesRef);
    console.log('url s firebasea', url);
    const registerData: RegisterData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      photoUrl: url,
    };
    dispatch(signUpWithEmailPassword(registerData));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={'firstName'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value || ''}
                      required
                      label={'First Name'}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={'lastName'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value || ''}
                      required
                      label={'Last Name'}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'email'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value || ''}
                      fullWidth
                      required
                      label={'Email'}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'password'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value || ''}
                      fullWidth
                      type="password"
                      required
                      label={'Password'}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'photoUrl'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropzoneArea filesLimit={1} onChange={onChange} />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
