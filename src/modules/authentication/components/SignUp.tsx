/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  Box,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Link } from '@reach/router';
import { DropzoneArea } from 'material-ui-dropzone';
import { RegisterData, useAuthentication } from 'modules/authentication';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type FormData = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  photoUrl: File[];
};

const theme = createTheme();

export const SignUp: React.FC = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    lastName: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const { registerWithEmailPassword } = useAuthentication();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: FormData) => {
    const file = data.photoUrl.shift();
    const registerData: RegisterData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      uploadedPhoto: file,
    };
    registerWithEmailPassword(registerData);
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
                  render={() => (
                    <div>
                      <TextField
                        required
                        fullWidth
                        {...register('firstName', { required: true })}
                        autoComplete="firstName"
                        margin="normal"
                        label={'First Name'}
                      />
                      <div>{errors.firstName?.message}</div>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={'lastName'}
                  control={control}
                  render={() => (
                    <div>
                      <TextField
                        required
                        fullWidth
                        {...register('lastName', { required: true })}
                        margin="normal"
                        autoComplete="lastName"
                        label={'Last Name'}
                      />
                      <div>{errors.lastName?.message}</div>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'email'}
                  control={control}
                  render={() => (
                    <div>
                      <TextField
                        fullWidth
                        {...register('email', { required: true })}
                        required
                        label={'Email'}
                      />
                      <div>{errors.email?.message}</div>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'password'}
                  control={control}
                  render={() => (
                    <div>
                      <TextField
                        fullWidth
                        {...register('password', { required: true })}
                        type="password"
                        required
                        label={'Password'}
                      />
                      <div>{errors.password?.message}</div>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={'photoUrl'}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <DropzoneArea filesLimit={1} onChange={onChange} />
                  )}
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
