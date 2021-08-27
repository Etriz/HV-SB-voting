import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const EMPTY_FORM = { name: '', rating: '' };

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0),
  },
  formControl: {
    minWidth: '65vw',
  },
  selectEmpty: {
    margin: theme.spacing(2, 0),
  },
  selection: {
    '&:hover': {
      backgroundColor: '#badcd0',
    },
  },
  radioLabel: {
    textAlign: 'left',
    margin: theme.spacing(2, 0, 1),
  },
  radioGroup: {
    margin: theme.spacing(1, 'auto'),
  },
  checkedIcon: {
    borderRadius: '50%',
    backgroundColor: '#1E3932',
    '&:before': {
      display: 'block',
      width: 24,
      height: 24,
      content: '""',
    },
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

const VotingForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const [message, setMessage] = useState('set message here');
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [allNames, setAllNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await axios.get('https://hv-sb-voting.herokuapp.com/api/message');
      const newMessage = response.data.data.message;
      setMessage(newMessage);
    };
    const getAllNames = async () => {
      const response = await axios.get('https://hv-sb-voting.herokuapp.com/api/names');
      const data = await response.data.data;
      const filterData = data.filter((person) => person.name !== 'message');
      const names = filterData.map((person) => person.name);
      // console.log(names);
      setAllNames(names);
      setLoading(false);
    };
    fetchMessage();
    getAllNames();
  }, []);

  const handleNameChange = (event) => {
    setFormState({ ...formState, name: event.target.value });
  };
  const handleRatingChange = (event) => {
    setFormState({ ...formState, rating: event.target.value });
  };
  const handleVote = async () => {
    if (formState.name !== '' && formState.rating !== '') {
      await axios.put(`https://hv-sb-voting.herokuapp.com/api/votes`, formState);
      setFormState(EMPTY_FORM);
      history.push('/thanks');
    }
  };

  return loading ? (
    <FormLoading />
  ) : (
    <Container className={classes.root}>
      <p>{message}</p>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend" className={classes.radioLabel}>
          Name
        </FormLabel>
        <Select
          labelId="name-label"
          id="names"
          value={formState.name}
          onChange={handleNameChange}
          displayEmpty
          className={classes.selectEmpty}>
          <MenuItem value="">
            <em>-- select one --</em>
          </MenuItem>
          {allNames.map((name) => (
            <MenuItem value={name.toLowerCase()} key={name} className={classes.selection}>
              {capitalizeName(name)}
            </MenuItem>
          ))}
        </Select>
        <FormLabel component="legend" className={classes.radioLabel}>
          Grade
        </FormLabel>
        <RadioGroup
          aria-label="rating"
          name="rating"
          value={formState.rating}
          onChange={handleRatingChange}
          className={classes.radioGroup}
          row>
          <FormControlLabel
            value="A"
            control={<Radio checkedIcon={<span className={classes.checkedIcon} />} />}
            label="A"
          />
          <FormControlLabel
            value="B"
            control={<Radio checkedIcon={<span className={classes.checkedIcon} />} />}
            label="B"
          />
          <FormControlLabel
            value="C"
            control={<Radio checkedIcon={<span className={classes.checkedIcon} />} />}
            label="C"
          />
          <FormControlLabel
            value="D"
            control={<Radio checkedIcon={<span className={classes.checkedIcon} />} />}
            label="D"
          />
        </RadioGroup>
        <Button
          variant="contained"
          disabled={formState.name === '' || formState.rating === '' ? true : false}
          className={classes.button}
          onClick={handleVote}>
          Vote Now!
        </Button>
      </FormControl>
    </Container>
  );
};

const FormLoading = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <h3>Loading ...</h3>
      <p>Please Wait, This May Take a Moment</p>
    </Container>
  );
};

export default VotingForm;
