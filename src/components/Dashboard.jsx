import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfoForm from './InfoForm';
import AddRemoveForm from './AddRemoveForm';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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

const Dashboard = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://hv-sb-voting.herokuapp.com/api/votes');
      const allVotes = await response.data.data;
      const values = await [...allVotes.values()];
      const filterValues = values.filter((person) => person.name !== 'message');
      // console.log('values', [...values]);
      setAllData(filterValues);
    };
    fetchData();
  }, []);
  const capitalizeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };
  // const resetAll = async () => {
  //   await axios.put(`https://hv-sb-voting.herokuapp.com/api/votes`, 'formState');
  // };

  const displayAllData = () => {
    return (
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
        <Button variant="contained" className={classes.button}>
          !! RESET ALL !!
        </Button>
      </>
    );
  };
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
        {displayAllData}
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
