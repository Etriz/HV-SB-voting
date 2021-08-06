import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TopBar from './components/TopBar';
import VotingForm from './components/VotingForm';
import Thanks from './components/Thanks';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopBar />
      <Router>
        <Route exact path="/">
          <VotingForm />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/thanks">
          <Thanks />
        </Route>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
