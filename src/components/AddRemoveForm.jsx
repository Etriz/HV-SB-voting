import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 'auto'),
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
const EMPTY_RATING = { A: 0, B: 0, C: 0, D: 0 };

const AddRemoveForm = () => {
  const classes = useStyles();

  const [addForm, setAddForm] = useState('');
  const [dbAdd] = useState({ name: addForm.toLowerCase(), rating: EMPTY_RATING });
  const [removeForm, setRemoveForm] = useState('');

  const handleAddChange = (event) => {
    setAddForm(event.target.value);
  };
  const handleRemoveChange = (event) => {
    setRemoveForm(event.target.value);
  };
  const handleAddSubmit = () => {
    if (addForm !== '') {
      setAddForm('');
    }
  };
  const handleRemoveSubmit = () => {
    if (removeForm !== '') {
      setRemoveForm('');
    }
  };

  return (
    <Container className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend" className={classes.inputLabel}>
          Add
        </FormLabel>
        <Input value={addForm} onChange={handleAddChange} placeholder="Name to add" />
        <Button
          variant="contained"
          disabled={addForm === '' ? true : false}
          className={classes.button}
          onClick={handleAddSubmit}>
          Add
        </Button>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend" className={classes.inputLabel}>
          Remove
        </FormLabel>
        <Input value={removeForm} onChange={handleRemoveChange} placeholder="Name to remove" />
        <Button
          variant="contained"
          disabled={removeForm === '' ? true : false}
          className={classes.button}
          onClick={handleRemoveSubmit}>
          Remove
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddRemoveForm;
