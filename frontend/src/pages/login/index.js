import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../actions/auth';
import { getSettings } from '../../actions/setting'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStyles } from './style';
import { AppBar, Typography } from '@mui/material';
import CustomizeAlert from '../../utils/alert';

const theme = createTheme();

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { welcomeText, logoUrl } = useSelector(state => state.setting);
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(login(values, history));
        },
    });

    React.useEffect(() => {
        dispatch(getSettings());
        // eslint-disable-next-line
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Typography variant="h4" component="div" sx={{ flexGrid: 1 }} className={classes.topBar}>Turnbull Consulting</Typography>
            </AppBar>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
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
                        <img src={logoUrl} alt="logo" className={classes.logo} />
                        <Typography component="h1" variant="h4" align="center">
                            {welcomeText}
                        </Typography>
                        <Box component="form" className={classes.form} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                autoComplete="email"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                id="password"
                                autoComplete="current-password"
                            />
                            <Grid container justifyContent="right">
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#995BFC', width: 150 }}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Log in
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/background.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <CustomizeAlert />
        </ThemeProvider>
    );
}

export default Login;