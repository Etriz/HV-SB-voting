import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  nav: {
    background: '#1E3932',
    padding: theme.spacing(1.5, 0),
  },
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.nav}>
      <Typography variant="h4">Starbucks Voting</Typography>
    </AppBar>
  );
};

export default TopBar;
