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

const theme = createTheme();

type FormData = {
  email: string;
  password: string;
};

export const SignInSide: React.FC = () => {
  const { loginWithGoogle, loginWithEmailPassword, resetPassword } =
    useAuthentication();
  const { handleSubmit, control } = useForm<FormData>();
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
            backgroundImage:
              'url(https://as1.ftcdn.net/v2/jpg/03/67/00/34/500_F_367003415_3JIx0TrEgjIGCC8PG2Ti0fTnbeOu8Pj1.jpg)',
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
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value || ''}
                    required
                    label={'Email'}
                  />
                )}
              />
              <Controller
                name={'password'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value || ''}
                    required
                    type="password"
                    label={'Password'}
                  />
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
                type="submit"
                fullWidth
                onClick={handleSubmit(handleSignIn)}
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
                  <Link to="/register">Dont have an account? Sign up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
