import {
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
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
import { RegisterData } from 'modules/authentication';
import { useAuthentication } from 'modules/authentication';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  photoUrl: File[];
};

const theme = createTheme();

export const SignUp: React.FC = () => {
  const { registerWithEmailPassword } = useAuthentication();
  const { handleSubmit, control } = useForm<FormData>();
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
                  render={({ field: { onChange } }) => (
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
