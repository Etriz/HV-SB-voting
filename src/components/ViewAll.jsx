import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  person: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    borderBottom: '1px solid black',
  },
  name: {
    alignSelf: 'center',
  },
  ratingsGroup: {
    padding: theme.spacing(1),
    borderLeft: '1px solid black',
    margin: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    display: 'block',
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(1, 2),
    background: '#1E3932',
    color: 'white',
    border: '1px solid #1E3932',
    '&:hover': {
      background: 'white',
      color: '#1E3932',
    },
  },
  alert: {
    width: '100%',
  },
}));

const ViewAll = ({ allData, setLoading }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const capitalizeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };
  const resetAll = async () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleReset = async () => {
    setOpen(false);
    setLoading(true);
    await axios.delete('https://hv-sb-voting.herokuapp.com/api/deleteall');
    window.location.reload();
  };

  return allData.length > 0 ? (
    <>
      {allData.map((item) => (
        <div key={item.name} className={classes.person}>
          <div className={classes.name}>{capitalizeName(item.name)}</div>
          <div className={classes.ratingsGroup}>
            {Object.entries(item.rating).map((letter) => {
              return <span key={letter}>{`${letter[0]}: ${letter[1]}`}</span>;
            })}
          </div>
        </div>
      ))}
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => window.location.reload()}>
        Reload Names
      </Button>
      <Button variant="contained" className={classes.button} onClick={resetAll}>
        !! RESET ALL !!
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Reset all names and votes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete all names and reset all ratings. Names will need to be added again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} className={classes.button}>
            Reset All
          </Button>
          <Button onClick={handleCancel} className={classes.button} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <h2>No names added yet!</h2>
  );
};

export default ViewAll;
