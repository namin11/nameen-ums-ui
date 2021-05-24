/* eslint-disable linebreak-style */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Examination from './ResultMenu';
import Seating from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    padding: '10px',
    color: 'white',
    width: '100%',
  },
  root2: {
    flexGrow: 1,
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    padding: '10px',
    color: 'white',
    width: '100%',
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  }
}));

const examination = ({ className, ...rest }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  //   const [values, setValues] = useState({
  //     seatingId: '',
  //     course_id: allSeating && allSeating[0] && allSeating[0].name,
  //     roomNumber: '',
  //     courseName: '',
  //     reportingTime: '',
  //     date: '',
  //     time: '',
  //   });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div className={classes.root2}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Seating Plan</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <Card
                  className={clsx(classes.root1, className)}
                  {...rest}
                >
                  <Seating />
                </Card>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Result</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <Examination />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Card>
  );
};
examination.propTypes = {
  className: PropTypes.string,
};
export default examination;
