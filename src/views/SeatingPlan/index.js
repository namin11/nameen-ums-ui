import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { addSeatingdata } from '../../action';
import Result from './Result';

const useStyles = makeStyles(() => ({
  root: {},
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  }
}));
const apiUrl = 'http://localhost:3000';
const SeatingPlan = ({ className, ...rest }) => {
  const classes = useStyles();
  const [allSubject, setAllSubject] = useState([]);
  const [allSeating, setAllSeating] = useState([]);
  const [subject, setSubject] = useState('');
  const [open, setOpen] = useState(false);
  const [UserAdmin, setUseradmin] = useState([]);
  const [values, setValues] = useState({
    couse_id: allSubject && allSubject[0] && allSubject[0].name,
    roomNumber: '',
    reportingTime: '',
    date: '',
  });
  const getSubject = async () => {
    const response = await fetch(`${apiUrl}/v1/users/course-list?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    setAllSubject(countryArray.data.rows);
  };
  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-examSeating?&limit=100`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    setAllSeating(countryArray.data.rows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date(values.date);
    const nDate = parseInt(Date.parse(date), 10);
    const requestBody = {
      course: values.couse_id,
      room_number: values.roomNumber,
      course_name: subject,
      reporting_time: values.reportingTime,
      time: values.time,
      date: nDate,
    };
    rest.addSeatingdata(JSON.stringify(requestBody));
    getResponse();
  };

  useEffect(() => {
    if (allSubject.length === 0) {
      getResponse();
      getSubject();
    }
  }, [allSubject]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${apiUrl}/v1/users/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const con = await response.json();
      setUseradmin(con.data);
    })();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === 'couse_id' && event.target.value) {
      if (allSubject) {
        const sub = allSubject.find((element) => element._id === event.target.value);
        setSubject(sub.name);
      }
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/users/delete-examSeating/${id}`, {
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
  const editQuery = async (value) => {
    const date = new Date(value.date);
    const nDate = parseInt(Date.parse(date), 10);
    const reqBody = {
      _id: value?.seatingId,
      course: value?.couse_id,
      room_number: value?.roomNumber,
      course_name: value?.courseName,
      reporting_time: value?.reportingTime,
      time: value.time,
      date: nDate,
    };
    const response = await fetch(`${apiUrl}/v1/users/edit-examSeating`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: JSON.stringify(reqBody),
    });
    const countryArray = await response.json();
    console.log('delete ', countryArray);
    getResponse();
    // setAllQuery(countryArray.data.contact_request);
  };

  const deleteItem = (id) => {
    deleteQuery(id);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editItem = (value) => {
    editQuery(value);
  };
  return (
    <>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CREATE Seating</DialogTitle>
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Course"
                  name="couse_id"
                  onChange={handleChange}
                  select
                  // SelectProps={{ native: true }}
                  value={values.couse_id}
                  variant="outlined"
                >
                  {allSubject && allSubject.map((data) => (
                    <option
                      key={data._id}
                      value={data._id}
                    >
                      {data.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Room Number"
                  name="roomNumber"
                  onChange={handleChange}
                  value={values.roomNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Reporting Time"
                  name="reportingTime"
                  type="number"
                  onChange={handleChange}
                  value={values.reportingTime}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  name="date"
                  format="YYYY-MM-DD"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="number"
                  onChange={handleChange}
                  value={values.time}
                  variant="outlined"
                />
              </Grid>
            </Grid>
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
      {UserAdmin && UserAdmin.user_type === 1
        ? (
          <Button
            color="primary"
            variant="contained"
            className={classes.btnSubmit}
            onClick={() => handleClickOpen()}
          >
            Add Seating
          </Button>
        ) : ''}
      <Result
        allSeating={allSeating}
        allSubject={allSubject}
        editItem={editItem}
        deleteItem={deleteItem}
        style={{ marginTop: '12px' }}
      />
    </>

  );
};

SeatingPlan.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
    userDetails: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSeatingdata: (seatingData) => { dispatch(addSeatingdata(seatingData)); }

  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(SeatingPlan);
