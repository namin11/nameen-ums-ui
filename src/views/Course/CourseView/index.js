import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { addCourse } from '../../../action';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  btnCancle: {
    border: 'solid 1px #b6286a',
    color: '#b6286a',
    backgroundColor: '#fff',
    margin: '10px 0px',
    borderRadius: '20px'
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  }
}));
const apiUrl = 'http://localhost:3000';
const CourseView = ({ ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const [allCourse, setAllCourse] = useState([]);
  const [values, setValues] = useState({
    Course_name: '',
    Course_fees: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  // };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/program-list?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total !== 0 && countryArray.data) {
      setAllCourse(countryArray.data.rows);
    }
    if (countryArray.data.total === 0) {
      setTotal(0);
    } else {
      setTotal(countryArray.data.total);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      name: values.Course_name,
      fees: values.Course_fees,
    };
    rest.addCourse(JSON.stringify(requestBody));
    getResponse();
  };

  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/users/delete-program/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
    });
    const countryArray = await response.json();
    console.log('delete ', countryArray);
    getResponse();
    // setAllQuery(countryArray.data.contact_request);
  };
  const editQuery = async (id, value) => {
    console.log(value);
    const response = await fetch(`${apiUrl}/v1/users/update-program`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: JSON.stringify({
        _id: id,
        name: value.Course_name,
        fees: value.Course_fees
      }),
    });
    const countryArray = await response.json();
    console.log('delete ', countryArray);
    getResponse();
    // setAllQuery(countryArray.data.contact_request);
  };

  const deleteItem = (id) => {
    deleteQuery(id);
  };
  const editItem = (id, value) => {
    editQuery(id, value);
  };

  useEffect(() => {
    if (allCourse.length === 0) {
      getResponse();
    }
  }, [allCourse]);

  useEffect(() => {
    if (rest.coursedetails && rest.coursedetails.status === '1') {
      getResponse();
    }
  }, [rest.coursedetails]);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar handleClickOpen={handleClickOpen} />
        <Box mt={3}>
          <Results
            allCourse={allCourse}
            deleteItem={deleteItem}
            editItem={editItem}
            total={total}
          />
        </Box>
      </Container>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CREATE PROGRAM</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="Course_name"
              name="Course_name"
              label="Program Name"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Course_fees"
              name="Course_fees"
              label="Fees per Semester"
              type="number"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions style={{ marginRight: '15px' }}>
            <Button onClick={handleClose} color="primary" className={classes.btnCancle}>
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Page>
  );
};

CourseView.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    coursedetails: state.coursedetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (courseData) => { dispatch(addCourse(courseData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseView);
