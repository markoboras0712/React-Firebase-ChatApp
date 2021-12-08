/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
  Avatar,
  Button,
  TextField,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { LoginData, useAuthentication } from 'modules/authentication';
import { Link } from '@reach/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const theme = createTheme();

type FormData = {
  email: string;
  password: string;
};

export const SignInSide: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const { loginWithGoogle, loginWithEmailPassword, resetPassword } =
    useAuthentication();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const handleSignIn = () => {
    loginWithGoogle();
  };
  const onSubmit = (data: FormData) => {
    const loginData: LoginData = {
      email: data.email,
      password: data.password,
    };
    loginWithEmailPassword(loginData);
  };

  const passwordResetHandler = (data: FormData) => {
    resetPassword(data.email);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Controller
                name={'email'}
                control={control}
                render={() => (
                  <div>
                    <TextField
                      required
                      fullWidth
                      {...register('email', { required: true })}
                      autoComplete="email"
                      margin="normal"
                      label={'Email'}
                    />
                    <div>{errors.email?.message}</div>
                  </div>
                )}
              />
              <Controller
                name={'password'}
                control={control}
                render={() => (
                  <div>
                    <TextField
                      required
                      fullWidth
                      {...register('password', { required: true })}
                      autoComplete="current-password"
                      margin="normal"
                      type="password"
                      label={'Password'}
                    />
                    <div>{errors.password?.message}</div>
                  </div>
                )}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                onClick={handleSignIn}
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Sign In With Google
              </Button>
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit(passwordResetHandler)}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Forgot your password
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Button
                    color="info"
                    component={Link}
                    to={'/register'}
                    variant="contained"
                  >
                    Dont have an account? Sign up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
