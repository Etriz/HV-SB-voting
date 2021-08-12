import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const PASSWORD = 'starvee3';

const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [openRetry, setOpenRetry] = useState(false);
  const [password, setPassword] = useState('');
  const [correctPassword, setCorrectPassword] = useState(false);

  const toDashboard = () => {
    if (window.location.pathname === '/' && !correctPassword) {
      setOpenDialog(true);
    } else if (window.location.pathname === '/' && correctPassword) {
      history.push('/dashboard/');
    } else {
      history.push('/');
    }
  };
  const handleClose = () => {
    setOpenDialog(false);
    setOpenRetry(false);
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setCorrectPassword(true);
      setOpenDialog(false);
      history.push('/dashboard/');
    } else {
      setOpenDialog(false);
      setOpenRetry(true);
    }
  };
  const handleRetry = (e) => {
    e.preventDefault();
    setOpenDialog(true);
    setOpenRetry(false);
  };

  return (
    <AppBar position="static" className={classes.nav}>
      <img src={logo} alt="starbucks logo" className={classes.logo} onClick={toDashboard} />
      <Typography variant="h4" className={classes.text}>
        Starbucks Voting
      </Typography>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Enter Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            type="text"
            value={password}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRetry} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Wrong Password</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRetry} color="primary">
            Retry
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default TopBar;
