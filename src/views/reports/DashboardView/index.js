import React from 'react';
import {
  Container,
  Grid, AppBar, Box, Typography,
  makeStyles, Tabs, Tab,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import Finance from './Finance';
import Relationship from './Relationship';
import Examination from '../../SeatingPlan/Examination';
// import Account from '../../account/AccountView/index';
import Announcement from '../../announcement/Announcement/index';
// import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Dashboard = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { userdata } = props;

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      {/* <Container maxWidth={false}>
        {userdata && userdata.data.user_type === 1 ? 'ADMIN DASHBOARD' : 'STUDENT DASHBOARD'}
      </Container> */}
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >

          {userdata?.user_type === 2
            && (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <LatestProducts userdata={userdata} />

              </Grid>
            )}
          {userdata.user_type === 2
            && (
              <Grid>
                <Announcement />
              </Grid>
            )}

          {userdata.user_type === 1
            && (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <Budget />
              </Grid>
            )}
          {userdata.user_type === 1
            && (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TotalCustomers />
              </Grid>
            )}
          {userdata.user_type === 1
            && (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <TasksProgress />
              </Grid>
            )}
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid> */}
          {userdata?.user_type === 3
            && (
              <Grid
                item
                md={12}
                xs={12}
              >
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="Home Page" />
                    <Tab label="Examination" />
                    <Tab label="Finance Management" />
                    <Tab label="Relationship Management" />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      lg={4}
                      md={6}
                      xl={3}
                      xs={12}
                    >
                      <LatestProducts userdata={userdata} />
                    </Grid>
                    <Grid
                      item
                      lg={8}
                      md={12}
                      xl={9}
                      xs={12}
                    >
                      <LatestOrders userdata={userdata} />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Examination />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <br />
                  <Finance />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <br />
                  <Relationship />
                </TabPanel>
              </Grid>
            )}
        </Grid>
      </Container>
    </Page>
  );
};

Dashboard.propTypes = {
  userdata: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
