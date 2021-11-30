import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { addSubject, assignFaculty, studentSubject } from '../../../action';

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
const SubjectView = ({ ...rest }) => {
  const [opentwo, setOpentwo] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const classes = useStyles();
  const [allSubject, setAllSubject] = useState([]);
  const [Subject, setSubject] = useState([]);

  const handleClickOpentwo = () => {
    setOpentwo(true);
  };

  const handleClosetwo = () => {
    setOpentwo(false);
  };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/student-course-list?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    // const allData = countryArray.data.length === 0 ? [0] : countryArray.data;
    if (countryArray.data.length !== 0) {
      setAllSubject(countryArray.data);
    }
  };

  const getResponseSubject = async () => {
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
      setSubject(countryArray.data.rows);
    }
  };

  const handleSubmittwo = (event) => {
    event.preventDefault();
    console.log('event', event);
    // console.log('assign valuestwo', valuestwo);
    if (selectedRows) {
      const selectedList = selectedRows.filter((items) => items.isChecked !== false);
      const selectedList1 = selectedList.map((items) => {
        return items._id;
      });

      const requestBody = {
        course_ids: selectedList1
      };
      rest.studentSubject(JSON.stringify(requestBody));
      getResponse();
    }
  };

  useEffect(() => {
    if (allSubject.length === 0) {
      getResponse();
    }

    if (Subject.length === 0) {
      getResponseSubject();
    } else if (selectedRows.length === 0 && Subject) {
      Subject.map((items) => {
        items.isChecked = false;
        console.log('data selected', items);
        return items;
      });
      setSelectedRows(Subject);
    }
  }, [allSubject, Subject]);

  // useEffect(() => {
  //   if (rest.subjectdetails && rest.subjectdetails.status === '1') {
  //     getResponse();
  //   }
  // }, [rest.subjectdetails]);

  const onSelectClick = (row) => {
    const newSelectedRow = selectedRows.map((item) => {
      if (item._id === row._id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return { ...item };
    });
    setSelectedRows(newSelectedRow);
  };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar handleClickOpentwo={handleClickOpentwo} />
        <Box mt={3}>
          <Results allSubject={allSubject} />
        </Box>
      </Container>
      <Dialog classes={{ paper: classes.dialogPaper }} open={opentwo} onClose={handleClosetwo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">SELECT SUBJECTS</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmittwo}
        >
          <DialogContent>
            {selectedRows && selectedRows.map((row) => (
              <div style={{ display: 'block' }}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={row.isChecked}
                      onChange={() => onSelectClick(row)}
                    />
                  )}
                  label={row.name}
                />
              </div>
            ))}
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
    assignFaculty: (assignData) => { dispatch(assignFaculty(assignData)); },
    studentSubject: (studentData) => { dispatch(studentSubject(studentData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectView);
