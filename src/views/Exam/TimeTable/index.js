import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Container,
  makeStyles,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Page from 'src/components/Page';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addTimetable } from '../../../action';
import SeatingPlan from '../../SeatingPlan';

const apiUrl = 'http://localhost:3000';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    padding: '10px',
    color: 'white',
    width: '100%',
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

const TimeTable = ({ className, userdata, ...rest }) => {
  const classes = useStyles();
  const [resultStudent, setResultStudent] = useState([]);
  const [allSubject, setAllSubject] = useState([]);
  const Semesters = {
    1: 'Sem 1',
    2: 'Sem 2',
    3: 'Sem 3',
    4: 'Sem 4',
    5: 'Sem 5',
    6: 'Sem 6',
    7: 'Sem 7',
    8: 'Sem 8',
  };
  // const handleChange = (event) => {
  //   console.log('event.target.files', event.target.files[0]);
  //   setFile(event.target.files[0]);
  // };

  // const uploadData = async (data) => {
  //   const response111 = await fetch('http://localhost:3000/v1/users/upload-exam-time-table', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: sessionStorage.getItem('Tokens'),
  //     },
  //     body: data
  //   }).then((response) => {
  //     setError('');
  //     setMsg('Sucessfully uploaded file');
  //     console.log('response', response);
  //   }).catch((err) => {
  //     setError(err);
  //   });

  //   console.log('ytyutuyruyruy', response111);
  // };

  // const DownloadFile = async () => {
  //   const response111 = await fetch('http://localhost:3000/v1/users/get-exam-time-table', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: sessionStorage.getItem('Tokens'),
  //     }
  //   });
  //   const countryArray = await response111.json();
  //   if (countryArray && countryArray.data && countryArray.data.path) {
  //     saveAs(countryArray.data.path, 'image.jpg');
  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   let data = '';
  //   if (!file) {
  //     setError('Please upload a file.');
  //     return;
  //   }

  //   if (file.size >= 2000000) {
  //     setError('File size exceeds limit of 2MB.');
  //     return;
  //   }

  //   data = new FormData();
  //   data.append('file', file);
  //   data.append('name', file.name);
  //   // setMsg('aaa');

  //   uploadData(data);

  //   // const requestBody = {
  //   //   name: values.filename,
  //   // };
  //   // console.log('file name', requestBody);
  //   // // rest.addTimetable(JSON.stringify(requestBody));
  //   // getResponse();
  // };

  // const downloadRandomImage = () => {
  //   DownloadFile();
  // };
  // .then((res) => {
  //   return res.blob();
  // })
  // .then((blob) => {
  //   const href = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = href;
  //   link.setAttribute('download', 'config.json');
  //   document.body.appendChild(link);
  //   link.click();
  // })
  // .catch((err) => {
  //   return err;
  // });
  useEffect(() => {
    (async () => {
      const response111 = await fetch(`${apiUrl}/v1/users/all-student-result-list?limit=200`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const countryArray = await response111.json();
      setResultStudent(countryArray?.data?.rows);
      const responseSub = await fetch(`${apiUrl}/v1/users/course-list?limit=200`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const sub = await responseSub.json();
      if (countryArray.data.total !== 0) {
        setAllSubject(sub.data.rows);
      }
    })();
  }, []);
  return (
    <Container>
      <br />
      <br />
      <Card
        className={clsx(classes.root)}
        {...rest}
      >
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Seating Plan</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box>
              <Container>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <SeatingPlan />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        {userdata && userdata?.user_type !== 3
          ? (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Result</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Page
                  className={classes.root}
                  title="Customers"
                >
                  <Container maxWidth={false}>
                    <Box mt={3}>
                      <MaterialTable
                        title="Result"
                        columns={[
                          { title: 'Id', field: 'register_id', type: 'numeric' },
                          { title: 'First Name', field: 'first_name', render: (res) => `${res.first_name} ${res.last_name}` },
                          { title: 'Semester', field: 'type', render: (res) => Semesters[res?.type] },
                          { title: 'Subject', field: 'type', render: (res) => allSubject?.filter((data) => data?._id === res?.course_id)[0]?.name || '-' },
                          { title: 'End Term Exam', field: 'ete', type: 'numeric' },
                          { title: 'Mid Term Exam', field: 'mte', type: 'numeric' },
                          { title: 'CA1', field: 'ca1', type: 'numeric' },
                          { title: 'CA2', field: 'ca2', type: 'numeric' },
                          { title: 'CA3', field: 'ca3', type: 'numeric' },
                        ]}
                        data={resultStudent}
                        options={{
                          search: false,
                          paging: false,
                        }}
                      />
                    </Box>
                  </Container>
                </Page>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ) : ''}
      </Card>
    </Container>
  );
};

TimeTable.propTypes = {
  className: PropTypes.string,
  userdata: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    coursedetails: state.coursedetails,
    userdata: state.userdata && state.userdata.data && state.userdata.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTimetable: (timetableData) => { dispatch(addTimetable(timetableData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
