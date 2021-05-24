import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  buttonStyle: {
    borderRadius: '25px',
    background: '#b6286a'
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        {rest.userdata.user_type === 1
          && (
            <Button
              color="primary"
              variant="contained"
              className={classes.buttonStyle}
              onClick={rest?.handleClickOpen}
            >
              Add Student
            </Button>
          )}
        {rest.userdata.user_type === 2
          && (
            <Button
              color="primary"
              variant="contained"
              className={classes.buttonStyle}
              onClick={rest?.handleClickOpentwo}
            >
              Student Attendance
            </Button>
          )}
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, null)(Toolbar);
