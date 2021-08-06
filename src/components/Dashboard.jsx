import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import VotingForm from './VotingForm';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bar: {
    backgroundColor: '#1E3932',
  },
  indicator: {
    backgroundColor: '#BADCD0',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [allData, setAllData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://hv-sb-voting.herokuapp.com/api/votes');
      const allVotes = await response.data.data;
      const values = await allVotes.values();
      console.log('values', [...values]);
      setAllData([...values]);
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Tabs value={tabIndex} onChange={handleChange} classes={{ indicator: classes.indicator }}>
          <Tab label="View All" />
          <Tab label="View By Name" />
          <Tab label="Add/Remove" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        {/* <VotingForm /> */}
        {allData.map((item) => (
          <p>item.name</p>
        ))}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default Dashboard;
