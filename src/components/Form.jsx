import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const names = ['Aida', 'Azzy', 'Cara', 'Jackob', 'Rebecca', 'Ryan'];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0),
  },
  formControl: {
    minWidth: '65vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selection: {
    '&:hover': {
      backgroundColor: '#badcd0',
    },
  },
  button: {
    marginTop: theme.spacing(2),
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

const Form = () => {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const handleVote = () => {
    if (name !== '') {
      setName('');
      history.push('/voted');
    }
  };

  return (
    <Container className={classes.root}>
      <p>If you had good sevice, you can vote for your barrista here!</p>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="name-label">
          Name
        </InputLabel>
        <Select
          labelId="name-label"
          id="names"
          value={name}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}>
          <MenuItem value="">
            <em>-- select one --</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem value={name.toLowerCase()} className={classes.selection}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          disabled={name === '' ? true : false}
          className={classes.button}
          onClick={handleVote}>
          Vote Now!
        </Button>
      </FormControl>
    </Container>
  );
};

export default Form;
