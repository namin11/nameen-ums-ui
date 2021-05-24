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
import { addSubject, assignFaculty } from '../../../action';

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
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const SubjectView = ({ ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [opentwo, setOpentwo] = React.useState(false);
  const [allFaculty, setAllFaculty] = useState([]);
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const [allSubject, setAllSubject] = useState([]);
  const [values, setValues] = useState({
    Subject_name: '',
    Subject_code: ''
  });

  const [valuestwo, setValuestwo] = useState({
    Subject_code: '',
    faculty_id: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpentwo = () => {
    setOpentwo(true);
  };

  const handleClosetwo = () => {
    setOpentwo(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangetwo = (event) => {
    setValuestwo({
      ...valuestwo,
      [event.target.name]: event.target.value
    });
  };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      code: values.Subject_code,
      name: values.Subject_name
    };
    rest.addSubject(JSON.stringify(requestBody));
  };

  const handleSubmittwo = (event) => {
    event.preventDefault();
    console.log('assign valuestwo', valuestwo);
    const requestBody = {
      course_id: valuestwo.Subject_code,
      user_id: valuestwo.faculty_id
    };
    rest.assignFaculty(JSON.stringify(requestBody));
  };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/course-list?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total !== 0) {
      setAllSubject(countryArray.data.rows);
    }
    if (countryArray.data.total === 0) {
      setTotal(0);
    } else {
      setTotal(countryArray.data.total);
    }
  };

  const getResponseFaculty = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-faculties?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total !== 0 && countryArray.data) {
      setAllFaculty(countryArray.data.rows);
    }
  };

  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/users/delete-course/${id}`, {
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
    const response = await fetch(`${apiUrl}/v1/users/update-course`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: JSON.stringify({
        _id: id,
        name: value
      }),
    });
    const countryArray = await response.json();
    console.log('edit ', countryArray);
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
    if (allSubject?.length === 0) {
      getResponse();
    }
    if (allFaculty?.length === 0) {
      getResponseFaculty();
    }
  }, [allSubject]);

  useEffect(() => {
    if (rest.subjectdetails && rest.subjectdetails.status === '1') {
      getResponse();
    }
  }, [rest.subjectdetails]);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar handleClickOpen={handleClickOpen} handleClickOpentwo={handleClickOpentwo} />
        <Box mt={3}>
          <Results
            allSubject={allSubject}
            editItem={editItem}
            deleteItem={deleteItem}
            total={total}
          />
        </Box>
      </Container>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CREATE SUBJECT</DialogTitle>
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
              id="Subject_code"
              name="Subject_code"
              label="Subject Code"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Subject_name"
              name="Subject_name"
              label="Subject Name"
              type="text"
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

      <Dialog maxWidth="xs" open={opentwo} onClose={handleClosetwo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ASSIGN SUBJECT</DialogTitle>
        <form
          style={{ marginTop: '-20px', width: '300px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmittwo}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <TextField
              fullWidth
              label="Select Subject"
              name="Subject_code"
              onChange={handleChangetwo}
              required
              select
            >
              {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
              {allSubject && allSubject.map((option) => (
                <option
                  key={option._id}
                  value={option._id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              style={{ marginTop: '30px' }}
              fullWidth
              label="Faculty"
              name="faculty_id"
              onChange={handleChangetwo}
              required
              select
            // SelectProps={{ native: true }}
            >
              {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
              {allFaculty && allFaculty.map((option) => (
                <option
                  key={option._id}
                  value={option._id}
                >
                  {option.first_name}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions style={{ marginRight: '15px' }}>
            <Button onClick={handleClosetwo} color="primary" className={classes.btnCancle}>
              Cancel
            </Button>
            <Button onClick={handleClosetwo} color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </Page>
  );
};

SubjectView.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  console.log('assign state----------', state);
  return {
    subjectdetails: state.subjectdetails,
    assignsubject: state.assignsubject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubject: (subjectData) => { dispatch(addSubject(subjectData)); },
    assignFaculty: (assignData) => { dispatch(assignFaculty(assignData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectView);
