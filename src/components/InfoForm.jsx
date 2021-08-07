import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 'auto'),
  },
  formControl: {
    minWidth: '65vw',
  },
  inputLabel: {
    textAlign: 'left',
    margin: theme.spacing(2, 0, 1),
  },
  button: {
    marginTop: theme.spacing(3),
    background: '#1E3932',
    color: 'white',
    border: '1px solid #1E3932',
    '&:hover': {
      background: 'white',
      color: '#1E3932',
    },
    '&:disabled': {
      border: '1px solid transparent',
    },
  },
}));

const InfoForm = () => {
  const classes = useStyles();

  const [formState, setFormState] = useState('');
  const handleMessageChange = (event) => {
    setFormState(event.target.value);
  };
  const handleSubmit = () => {
    if (formState !== '') {
      // setMain(formState);
      setFormState('');
    }
  };

  return (
    <Container className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend" className={classes.inputLabel}>
          Message
        </FormLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Type message here"
          value={formState}
          onChange={handleMessageChange}
        />
        <Button
          variant="contained"
          disabled={formState === '' ? true : false}
          className={classes.button}
          onClick={handleSubmit}>
          Set Message
        </Button>
      </FormControl>
    </Container>
  );
};

export default InfoForm;
