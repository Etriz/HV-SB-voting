import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import logo from './starbucks_logo.png';

const useStyles = makeStyles((theme) => ({
  nav: {
    background: '#eeeeee',
    padding: theme.spacing(1.5, 0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '45px',
    width: '45px',
    margin: theme.spacing(0, 1),
  },
  text: {
    color: '#1E3932',
    margin: theme.spacing(0, 2),
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.nav}>
      <a href="/dashboard">
        <img src={logo} alt="starbucks logo" className={classes.logo} />
      </a>
      <Typography variant="h4" className={classes.text}>
        Starbucks Voting
      </Typography>
    </AppBar>
  );
};

export default TopBar;
