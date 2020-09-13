import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/colors';
import authCover from '../../assets/coalition-logo.png';
import axios from 'axios';

import AppMap from '../../components/AppMap';

export const SignUp = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
  });

  const [location, setLocation] = useState([40, 40]);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    let body = {};
    body.firstname = user.name;
    body.lastname = user.surname;
    body.email = user.email;
    body.location = location;

    let result = await axios.post('/signup', body);
    console.log(result);
  };
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={4} className={classes.image} />
      <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
            style={{ fontSize: '2rem', marginBottom: '2rem' }}>
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={user.surname}
                  onChange={(e) =>
                    setUser({ ...user, surname: e.target.value })
                  }
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
            </Grid>
            <div style={{ height: '40vh', width: '100%', marginTop: '5vh' }}>
              <AppMap setLocation={setLocation} />
            </div>
            <Button
              onClick={signUp}
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign up
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const styles = {
  errorText: {
    color: 'red',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${authCover})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: '50%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: '3rem',
    width: '3rem',
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '3.5rem',
    fontSize: '1rem',
  },
}));
