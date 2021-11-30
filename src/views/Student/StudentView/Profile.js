/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
  Box,
  Button,
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Typography,
  Collapse,
  IconButton
} from '@material-ui/core';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { updateProfileDataAdmin } from '../../../action';
import FeesDetails from '../../reports/DashboardView/Finance';
import Assignment from './Assignment';

// import Results from './Results';

// const states = [
//   {
//     value: 'gujarat',
//     label: 'Gujarat'
//   },
//   {
//     value: 'karnataka',
//     label: 'Karnataka'
//   },
//   {
//     value: 'punjab',
//     label: 'Punjab'
//   }
// ];

const gender = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  rootHead: {
    flexGrow: 1,
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    padding: '10px',
    color: 'white',
    width: '100%',
  },
});
const apiUrl = 'http://localhost:3000';
function Row(props) {
  const {
    // eslint-disable-next-line react/prop-types
    row, allSubject, handleClickOpen, values, setValuesResult, setEdit, setValues
  } = props;
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // eslint-disable-next-line consistent-return
  function attendance(total) {
    if (total > 95 && total <= 100) return 5;
    if (total > 90 && total < 95) return 4;
    if (total > 85 && total < 90) return 3;
    if (total > 80 && total < 85) return 2;
    if (total > 75 && total < 80) return 1;
    if (total < 75) return 0;
  }
  // eslint-disable-next-line prefer-const
  const attendanceMark = attendance(parseInt(row?.presentAttendancePercentage, 10));
  const totalMarks = row?.ete + row?.mte
    + (parseInt((row?.ca1 + row?.ca2 + row?.ca3) / 3, 10) || 0) + attendanceMark;
  // eslint-disable-next-line consistent-return
  function gradeMark(total) {
    if (total >= 90 && total <= 100) return 'A';
    if (total >= 80 && total < 90) return 'B';
    if (total >= 70 && total < 80) return 'C';
    if (total >= 40 && total < 70) return 'D';
    if (total < 40) return 'fail';
  }
  const grade = gradeMark(totalMarks);
  return (
    <>
      <TableRow className={classes.root1}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {/* eslint-disable-next-line react/prop-types */}
          {allSubject?.filter((data) => data?._id === row?.course_id)[0]?.name}
        </TableCell>
        <TableCell>100</TableCell>
        <TableCell>
          {totalMarks}
        </TableCell>
        <TableCell>
          {grade}
        </TableCell>
        <TableCell>
          {console.log(row)}
          <IconButton onClick={async () => {
            await setValues({
              ...values,
              result_id: row?._id,
              CA1: row?.ca1,
              CA2: row?.ca2,
              CA3: row?.ca3,
              EndTermexam: row?.ete,
              MidTermExam: row?.mte,
              course_id: row?.course_id,
            });
            setValuesResult(row?.type);
            setEdit(true);
            handleClickOpen();
          }}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Result
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>End Term Exam</TableCell>
                    <TableCell>Mid Term Exam</TableCell>
                    <TableCell>CA1</TableCell>
                    <TableCell>CA2</TableCell>
                    <TableCell>CA3</TableCell>
                    <TableCell>Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row?.ete}</TableCell>
                    <TableCell>{row?.mte}</TableCell>
                    <TableCell>{row?.ca1}</TableCell>
                    <TableCell>{row?.ca2}</TableCell>
                    <TableCell>{row?.ca3}</TableCell>
                    <TableCell>{attendanceMark}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.any,
    ca1: PropTypes.number,
    ca2: PropTypes.number,
    ca3: PropTypes.number,
    ete: PropTypes.number,
    mte: PropTypes.number,
    course_id: PropTypes.any,
    type: PropTypes.number,
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    presentAttendancePercentage: PropTypes.any,
  }).isRequired,
};

const useStyles = makeStyles(() => ({
  root: {

    flexGrow: 1,
    minWidth: '100%'
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  },
  avatar: {
    height: 100,
    width: 100
  },
}));

const Profile = ({ className, ...rest }) => {
  const { state } = useLocation();
  const classes = useStyles();
  const [error, setError] = React.useState();
  const [errorAdhar, setErrorAdhar] = React.useState();
  const [msgAdhar, setMsgAdhar] = React.useState('');
  const [fileAdhar, setFileAdhar] = React.useState();
  const [msg, setMsg] = React.useState('');
  const [fileProfile, setFileProfile] = React.useState();
  const [country, setCountry] = useState([]);
  const [StateID, setState] = useState([]);
  const [city, setCity] = useState([]);
  const { StudentId, getResponseStudent } = state;
  const [allSubject, setAllSubject] = useState([]);
  const [userData, setUser] = React.useState();
  const [open, setOpen] = useState();
  // eslint-disable-next-line no-unused-vars
  const [assignmentData, setAssignmentData] = useState([]);
  console.log(assignmentData, userData);
  const [UserAdmin, setUseradmin] = React.useState([]);
  const [valueResult, setValuesResult] = useState();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState({
    _id: StudentId._id,
    first_name: StudentId.first_name,
    last_name: StudentId.last_name,
    father_name: StudentId.father_name,
    mother_name: StudentId.mother_name,
    date_of_birth: StudentId.date_of_birth,
    address: StudentId.address,
    email: StudentId.email,
    mobile: StudentId.mobile,
    state_id: StudentId.state_id,
    country_id: StudentId.country_id,
    gender: StudentId.gender,
    city_id: StudentId.city_id,
    CA1: '',
    CA2: '',
    CA3: '',
    Semester: 1,
  });

  const handleChangeResult = (e) => {
    setValuesResult(e.target.value);
  };

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
      setUser(con.data);
    })();
  }, []);

  const handleSubmitResult = async (event) => {
    event?.preventDefault();
    const requestBodyFaculty = {
      _id: edit ? values?.result_id : null,
      student_id: values._id,
      faculty_id: userData._id,
      course_id: values.course_id,
      ca1: values.CA1,
      ca2: values.CA2,
      ca3: values.CA3,
      type: valueResult
    };
    const requestBodyAdmin = {
      _id: edit ? values?.result_id : null,
      student_id: values._id,
      faculty_id: userData._id,
      course_id: values.course_id,
      ete: values.EndTermexam,
      mte: values.MidTermExam,
      type: valueResult
    };
    if (edit) {
      const responseEdit = await fetch(`${apiUrl}/v1/users/edit-student-result`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        },
        body: JSON.stringify(UserAdmin && UserAdmin?.user_type === 2
          ? requestBodyFaculty : requestBodyAdmin),
      });
      const countryArray = await responseEdit.json();
      console.log('delete ', countryArray);
    } else {
      const responseAdd = await fetch(`${apiUrl}/v1/users/create-student-result`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        },
        body: JSON.stringify(UserAdmin && UserAdmin?.user_type === 2
          ? requestBodyFaculty : requestBodyAdmin),
      });
      const countryArray = await responseAdd.json();
      console.log('delete ', countryArray);
    // You should see email and password in console.
    // ..code to submit form to backend here...
    }
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    // console.log('event : ', event);
    // const requestBody = {
    //   register_id: data.register_id,
    //   password: data.password
    // };
    // props.storeUserData(JSON.stringify(requestBody));
    const date = new Date(values.date_of_birth);
    const nDate = Date.parse(date);
    const requestBody = {
      _id: values._id,
      first_name: values.first_name,
      last_name: values.last_name,
      father_name: values.father_name,
      mother_name: values.mother_name,
      mobile: values.mobile,
      date_of_birth: nDate,
      gender: values.gender ? values.gender : 'male',
      email: values.email,
      address: values.address,
      country_id: values.country_id ? values.country_id : '5d441ff23b574544e86e97bf',
      state_id: values.state_id ? values.state_id : '5d4aa07dd8f03149d4bece48',
      city_id: values.city_id ? values.city_id : '5d4aa07dd8f03149d4bece49'
    };
    rest.updateProfileDataAdmin(JSON.stringify(requestBody));
    navigate('/app/Student', { replace: true });
    // You should see email and password in console.
    // ..code to submit form to backend here...
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setValues({
    //   ...values,
    //   result_id: '',
    //   CA1: '',
    //   CA2: '',
    //   CA3: '',
    //   EndTermexam: '',
    //   MidTermexam: '',
    //   course_id: '',
    // });
    // setValuesResult(1);
    // setEdit(false);
  };

  const handleChangeProfile = (event) => {
    setFileProfile(event.target.files[0]);
  };

  const handleChangeAdhar = (event) => {
    setFileAdhar(event.target.files[0]);
  };
  useEffect(() => {
    (async () => {
      const responseAss = await fetch(`${apiUrl}/v1/users/get-student-assignment-file/${StudentId?._id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const assignment = await responseAss.json();
      setAssignmentData(assignment.data);
      const response = await fetch(`${apiUrl}/v1/users/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const con = await response.json();
      setUser(con.data);
    })();
  }, []);
  const getResponse = async () => {
    if (country?.length === 0) {
      const response = await fetch(`${apiUrl}/v1/country/country-list`);
      const countryArray = await response.json();
      setCountry(countryArray.data);
    }
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
  };

  const uploadData = async (data) => {
    await fetch(`${apiUrl}/v1/users/upload-profile-pic`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: data,
    }).then(() => {
      setError('');
      setMsg('Sucessfully uploaded profile file');
      if (getResponseStudent) getResponseStudent();
    }).catch((err) => {
      setError(err);
    });
  };

  const uploadAdhar = async (dataAdhar) => {
    await fetch(`${apiUrl}/v1/users/upload-aadhaar-card`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: dataAdhar,
    }).then(() => {
      setErrorAdhar('');
      setMsgAdhar('Sucessfully uploaded Aadhar file');
      getResponse();
    }).catch((err) => {
      setErrorAdhar(err);
    });
  };

  const uploadImageAdhar = async (e) => {
    e?.preventDefault();
    let dataAdhar = '';
    if (!fileAdhar) {
      setErrorAdhar('Please upload aadhar card file.');
      return;
    }

    if (fileAdhar.size >= 2000000) {
      setErrorAdhar('File size exceeds limit of 2MB.');
      return;
    }

    dataAdhar = new FormData();
    dataAdhar.append('aadhaar_card', fileAdhar);
    dataAdhar.append('user_id', StudentId?._id);
    await uploadAdhar(dataAdhar);
  };

  const uploadImage = async (e) => {
    e?.preventDefault();
    let data = '';
    data = new FormData();
    data.append('profile_pic', fileProfile);
    data.append('user_id', StudentId?._id);
    await uploadData(data);
  };
  const getStateResponse = async (value) => {
    const response = await fetch(`${apiUrl}/v1/country/states-of-country/${value}`);
    const stateArray = await response.json();
    setState(stateArray.data);
  };

  const getCityResponse = async (value) => {
    const response = await fetch(`${apiUrl}/v1/country/cities-of-state/${value}`);
    const cityArray = await response.json();
    setCity(cityArray.data);
  };

  useEffect(() => {
    getResponse();
    if (rest.userdata.country_id && StateID?.length === 0) {
      getStateResponse(rest.userdata.country_id);
    }
    if (rest.userdata.state_id && city?.length === 0) {
      getCityResponse(rest.userdata.state_id);
    }
  }, [country, StateID, city]);

  const handleChange = (event) => {
    if (event.target.name === 'country_id' && event.target.value) {
      getStateResponse(event.target.value);
    } else if (event.target.name === 'state_id' && event.target.value) {
      getCityResponse(event.target.value);
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const Semester = [
    {
      type: 1,
      No: 'semester 1',
    },
    {
      type: 2,
      No: 'semester 2',
    },
    {
      type: 3,
      No: 'semester 3',
    },
    {
      type: 4,
      No: 'semester 4',
    },
    {
      type: 5,
      No: 'semester 5',
    },
    {
      type: 6,
      No: 'semester 6',
    },
    {
      type: 7,
      No: 'semester 7',
    },
    {
      type: 8,
      No: 'semester 8',
    },
  ];
  const [resultData, setResultData] = React.useState([]);
  const getResponseattendance = async (type) => {
    const response = await fetch(`${apiUrl}/v1/users/student-result-sem?type=${type}&&student_id=${StudentId?._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    setResultData(countryArray.data);
    console.log('countryArray', countryArray);
  };
  const handleClick = (type) => {
    getResponseattendance(type);
  };
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
      getResponseattendance(1);
    })();
  }, []);
  return (
    <>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="first_name"
                  onChange={handleChange}
                  value={values.first_name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  value={values.last_name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Father name"
                  name="father_name"
                  onChange={handleChange}
                  value={values.father_name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Mother name"
                  name="mother_name"
                  onChange={handleChange}
                  value={values.mother_name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Date of Birth"
                  name="date_of_birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  value={moment(values.date_of_birth).format('YYYY-MM-DD')}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  onChange={handleChange}
                  type="number"
                  value={values.mobile}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select Gender"
                  name="gender"
                  onChange={handleChange}
                  select
                  // SelectProps={{ native: true }}
                  value={values.gender}
                  variant="outlined"
                >
                  {gender.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country_id"
                  onChange={handleChange}
                  select
                  // SelectProps={{ native: true }}
                  value={values.country_id}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                >
                  {country?.length !== 0 && country && country.map((option) => (
                    <option
                      key={option.name}
                      value={option._id}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state_id"
                  onChange={handleChange}
                  select
                  // SelectProps={{ native: true }}
                  value={values.state_id}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                >
                  {StateID?.length !== 0 && StateID && StateID.map((option) => (
                    <option
                      key={option.name}
                      value={option._id}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city_id"
                  onChange={handleChange}
                  select
                  // SelectProps={{ native: true }}
                  value={values.city_id}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                >
                  {city?.length !== 0 && city && city.map((option) => (
                    <option
                      key={option.name}
                      value={option._id}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <center>
                  <Avatar className={classes.avatar} src={`${apiUrl}/${StudentId?.profile_pic?.replace(/\\/g, '/')}`} />
                </center>
                <Button color="primary" fullWidth variant="text" component="label">
                  Upload picture
                  <input
                    type="file"
                    name="avatar"
                    id="file"
                    style={{ display: 'none' }}
                    accept=".jpef, .png, .jpg"
                    onChange={handleChangeProfile}
                  />
                </Button>
                <center>
                  <Button onClick={() => uploadImage()} color="primary" className={classes.btnSubmit}>
                    upload profile
                  </Button>
                  <h4 style={{ color: 'red' }}>{error}</h4>
                  <h4 style={{ color: 'green' }}>{msg}</h4>
                </center>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <center>
                  <Avatar className={classes.avatar} src={`${apiUrl}/${StudentId?.aadhaar_card?.replace(/\\/g, '/')}`} />
                </center>
                <Button color="primary" fullWidth variant="text" component="label">
                  Upload Aadhar Card
                  <input
                    type="file"
                    name="avatar"
                    id="file"
                    style={{ display: 'none' }}
                    accept=".jpef, .png, .jpg"
                    onChange={handleChangeAdhar}
                  />
                </Button>
                <center>
                  <Button onClick={() => uploadImageAdhar()} color="primary" className={classes.btnSubmit}>
                    upload aadhar
                  </Button>
                  <h4 style={{ color: 'red' }}>{errorAdhar}</h4>
                  <h4 style={{ color: 'green' }}>{msgAdhar}</h4>
                </center>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
              className={classes.btnSubmit}
              type="submit"
            // onClick={buttonClick}

            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
      <br />
      {UserAdmin?.user_type === 2 ? (
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ float: 'right' }}
          className={classes.btnSubmit}
          onClick={() => {
            handleClickOpen();
            setValues({
              ...values,
              result_id: '',
              CA1: '',
              CA2: '',
              CA3: '',
              EndTermexam: '',
              MidTermExam: '',
              course_id: '',
            });
            setValuesResult(1);
            setEdit(false);
          }}
      >
          Add Result
        </Button>
      ) : ''}
      &nbsp;&nbsp;
      <br />
      <br />
      {Semester && Semester.map((sem) => (
        <>
          {UserAdmin?.user_type === 1 || UserAdmin?.user_type === 2 ? (
            <Button
              style={{ width: 'max-content', margin: '10px' }}
              size="small"
              color="primary"
              variant="contained"
              onClick={() => handleClick(sem.type)}
          >
              {sem?.No}
            </Button>
          ) : ''}
        </>
      ))}
      <Card
        className={clsx(classes.root1, className)}
        {...rest}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Subject</TableCell>
                <TableCell>Total Mark</TableCell>
                <TableCell>Obtain Mark</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultData && resultData.map((data) => (
                <Row
                  values={values}
                  setValues={setValues}
                  setValuesResult={setValuesResult}
                  key={data._id}
                  row={data}
                  handleClickOpen={handleClickOpen}
                  allSubject={allSubject}
                  setEdit={setEdit}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Result</DialogTitle>
        <form
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmitResult}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <TextField
              fullWidth
              label="Select Semester"
              name="Semester"
              onChange={handleChangeResult}
              required
              value={valueResult}
              select
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2 </option>
              <option value={3}>Semester 3 </option>
              <option value={4}>Semester 4 </option>
              <option value={5}>Semester 5 </option>
              <option value={6}>Semester 6 </option>
              <option value={7}>Semester 7 </option>
              <option value={8}>Semester 8 </option>
            </TextField>
            <TextField
              fullWidth
              label="Subject"
              name="course_id"
              onChange={handleChange}
              value={values?.course_id}
              required
              select
            // SelectProps={{ native: true }}
            >
              {allSubject && allSubject.map((option) => (
                <option
                  key={option._id}
                  value={option._id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            {UserAdmin && UserAdmin?.user_type === 1 ? (
              <>
                <TextField
                  autoFocus
                  id="Subject_name"
                  name="EndTermexam"
                  label="End Term exam"
                  type="number"
                  value={values?.EndTermexam}
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  id="Subject_name"
                  name="MidTermExam"
                  label="Mid Term Exam"
                  type="number"
                  value={values?.MidTermExam}
                  fullWidth
                  onChange={handleChange}
                />
              </>
            ) : ''}
            {UserAdmin && UserAdmin?.user_type === 2 ? (
              <>
                <TextField
                  autoFocus
                  id="Subject_name"
                  name="CA1"
                  label="CA1"
                  type="number"
                  fullWidth
                  value={values?.CA1}
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  id="Subject_name"
                  name="CA2"
                  label="CA2"
                  type="number"
                  fullWidth
                  value={values?.CA2}
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  id="Subject_name"
                  name="CA3"
                  label="CA3"
                  type="number"
                  fullWidth
                  value={values?.CA3}
                  onChange={handleChange}
                />
              </>
            ) : ''}

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
      <br />
      {/* {handleSubmit && <Results />} */}
      {UserAdmin && (UserAdmin.user_type === 2 || UserAdmin.user_type === 1)
        ? (
          <Card
            className={clsx(classes.root, className)}>
            <Assignment StudentId={StudentId} />
          </Card>
        ) : ''}
      <br />
      {UserAdmin && UserAdmin.user_type === 3 ? (
        <>
          <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <Box minWidth={1050}>
              <br />
              <FeesDetails />
            </Box>
          </Card>
        </>
      )
        : ''}
    </>
  );
};

Profile.propTypes = {
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
    updateProfileDataAdmin: (updateData) => { dispatch(updateProfileDataAdmin(updateData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
