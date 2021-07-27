import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0),
  },
}));

const Thanks = () => {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.root}>
      Thank you for voting!
    </Typography>
  );
};

export default Thanks;
