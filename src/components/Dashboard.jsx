import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ViewAll from './ViewAll';
import AddRemoveForm from './AddRemoveForm';
import InfoForm from './InfoForm';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
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
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://hv-sb-voting.herokuapp.com/api/votes');
      const allVotes = await response.data.data;
      const values = await [...allVotes.values()];
      const filterValues = values.filter((person) => person.name !== 'message');
      // console.log('values', [...values]);
      setAllData(filterValues);
      setLoading(false);
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
          <Tab label="Add/Remove" />
          <Tab label="Edit Info" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        {loading ? <p>Loading ...</p> : <ViewAll allData={allData} setLoading={setLoading} />}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <AddRemoveForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <InfoForm />
      </TabPanel>
    </div>
  );
};

export default Dashboard;
