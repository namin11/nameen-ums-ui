/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
import { addStudent, attendanceStudent } from '../../../action';

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
const StudentView = ({ ...rest }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [opentwo, setOpentwo] = React.useState(false);
  const classes = useStyles();
  const [allStudent, setAllStudent] = useState([]);
  const [total, setTotal] = useState(0);
  const [Subject, setSubject] = useState([]);
  const [Student, setStudent] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const { handleSubmit, register, errors } = useForm();
  const [values, setValues] = useState({
    first_name: 'male',
    last_name: '',
    r_id: '',
    password: '',
    c_id: '0',
    subject: ''
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
    console.log('value', event.target.value);
  };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  // };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-students?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray?.data?.total !== 0 && countryArray?.data) {
      setAllStudent(countryArray?.data?.rows);
      setStudent(countryArray?.data?.rows);
    }
    if (countryArray.data.total === 0) {
      setTotal(0);
    } else {
      setTotal(countryArray?.data?.total);
    }
  };

  const getResponseCourse = async () => {
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

  const onSubmit = () => {
    const requestBody = {
      register_id: values.r_id,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      program_id: values.c_id
    };
    rest.addStudent(JSON.stringify(requestBody));
    handleClose();
  };

  const handleSubmittwo = (event) => {
    event.preventDefault();
    console.log('event', event);
    // console.log('assign valuestwo', valuestwo);
    if (selectedRows) {
      // let selectedList = selectedRows.filter((items) => items.isChecked !== false);
      const selectedList = selectedRows.map((items) => {
        return {
          student_id: items._id,
          is_present: items.isChecked === 'present'
        };
      });

      const requestBody = {
        course_id: values.subject,
        student_ids: selectedList
      };
      rest.attendanceStudent(JSON.stringify(requestBody));
      console.log('aa', requestBody);
      console.log('selectedList', selectedList);
    }
  };

  const onSelectClick = (row, status) => {
    const newSelectedRow = selectedRows.map((item) => {
      if (item._id === row._id) {
        return { ...item, isChecked: status };
      }
      return { ...item };
    });
    setSelectedRows(newSelectedRow);
  };

  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/users/delete-user/${id}`, {
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

  const editItem = (StudentId) => {
    console.log(StudentId);
    navigate('/app/StudentProfile', { state: { StudentId } });
  };

  const deleteItem = (id) => {
    deleteQuery(id);
  };

  useEffect(() => {
    if (rest.studentdetails && rest.studentdetails.status === '1') {
      getResponse();
    }
  }, [rest.studentdetails]);

  useEffect(() => {
    if (allStudent?.length === 0) {
      getResponse();
    } else if (selectedRows?.length === 0 && Student) {
      Student.map((items) => {
        items.isChecked = false;
        console.log('data selected', items);
        return items;
      });
      setSelectedRows(Student);
    }
    if (allCourse?.length === 0) {
      getResponseCourse();
    }
    if (Subject?.length === 0) {
      getResponseSubject();
    }
  }, [allStudent, allCourse, Student, Subject]);

  console.log('student', selectedRows);
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar handleClickOpen={handleClickOpen} handleClickOpentwo={handleClickOpentwo} />
        {
          rest.studentdetails && rest.studentdetails.status !== '1' && <Alert severity="error">{rest.studentdetails.message}</Alert>
        }
        <Box mt={3}>
          <Results
            allStudent={allStudent}
            deleteItem={deleteItem}
            total={total}
            editItem={editItem}
          />
        </Box>
      </Container>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CREATE STUDENT</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <TextField
              fullWidth
              label="Select Course"
              name="c_id"
              id="c_id"
              onChange={handleChange}
              required
              defaultValue={0}
              // inputRef={register({
              //   required: 'Course Required'
              // })}
              select
            // SelectProps={{ native: true }}
            >
              {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
              <option value={0}>
                Select Program
              </option>
              {allCourse && allCourse?.map((option) => (
                <option
                  key={option?._id}
                  value={option?._id}
                >
                  {option?.name}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              id="first_name"
              name="first_name"
              label="First Name"
              type="text"
              fullWidth
              onChange={handleChange}
              inputRef={register({
                required: 'first name Required'
              })}
            />
            <span style={{ color: 'red' }}>{errors?.first_name && <p>{errors?.first_name?.message}</p>}</span>

            <TextField
              // autoFocus
              margin="dense"
              id="last_name"
              name="last_name"
              label="Last Name"
              type="text"
              fullWidth
              onChange={handleChange}
              inputRef={register({
                required: 'Last name Required'
              })}
            />
            <span style={{ color: 'red' }}>{errors?.last_name && <p>{errors?.last_name?.message}</p>}</span>

            <TextField
              // autoFocus
              margin="dense"
              id="r_id"
              name="r_id"
              label="Ragister ID"
              type="text"
              fullWidth
              onChange={handleChange}
              inputRef={register({
                required: 'Ragister id Required',
                minLength: {
                  value: 8,
                  message: 'Ragister id must be 8 characters'
                },
                maxLength: {
                  value: 8,
                  message: 'Ragister id must be 8 characters'
                }
              })}
            />
            <span style={{ color: 'red' }}>{errors?.r_id && <p>{errors?.r_id?.message}</p>}</span>

            <TextField
              // autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="text"
              fullWidth
              onChange={handleChange}
              inputRef={register({
                required: 'Password Required',
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$]).{8,}$/,
                  message: 'Password should be combination of one uppercase, one lower case, one special character, one digit and minimum 8.'
                }
              })}
            />
            <span style={{ color: 'red' }}>{errors?.password && <p>{errors?.password?.message}</p>}</span>

          </DialogContent>
          <DialogActions style={{ marginRight: '15px' }}>
            <Button onClick={handleClose} color="primary" className={classes.btnCancle}>
              Cancel
            </Button>
            <Button color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog classes={{ paper: classes.dialogPaper }} open={opentwo} onClose={handleClosetwo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ATTENDANCE</DialogTitle>
        <form
          style={{ marginTop: '-20px', padding: '40px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmittwo}
        >
          <TextField
            fullWidth
            label="Select Subject"
            name="subject"
            onChange={handleChange}
            required
            select
            // SelectProps={{ native: true }}
            style={{ padding: '20px' }}
          >
            {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
            {Subject && Subject?.map((option) => (
              <option
                key={option?._id}
                value={option?._id}
              >
                {option?.name}
              </option>
            ))}
          </TextField>
          <DialogContent>
            <div
              style={
                {
                  color: '#546e7a', fontSize: '12px', marginLeft: '-20px', fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontWeight: '400', lineHeight: '1', letterSpacing: '0.00938em'
                }
              }
            >
              Students
            </div>
            <Table>
              <TableHead>
                <TableCell>
                  Register Id
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Attendance
                </TableCell>
              </TableHead>
              <TableBody>
                {selectedRows && selectedRows?.map((row) => (
                  <TableRow>
                    <TableCell>
                      {row?.register_id}
                    </TableCell>
                    <TableCell>
                      {row?.first_name}
                      {' '}
                      {row?.last_name}
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex' }}>
                        <RadioGroup aria-label="gender" name="gender1" value={row.isChecked} onChange={(e) => onSelectClick(row, e.target.value)}>
                          <FormControlLabel
                            value="present"
                            control={(
                              <Radio />
                            )}
                            label="Present"
                          />
                          <FormControlLabel
                            value="absent"
                            control={(
                              <Radio />
                            )}
                            label="Absent"
                          />
                        </RadioGroup>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <center>
              Total students :
              {selectedRows?.length}
            </center>
            <center>
              Attandee :
              {selectedRows?.filter((data) => data?.isChecked === 'present')?.length}
            </center>
            <center>
              Left :
              {selectedRows?.filter((data) => data?.isChecked === 'absent')?.length || 0}
            </center>
            <center>
              Percentage :
              {((selectedRows?.filter(
                (data) => data?.isChecked === 'present'
              )?.length * 100) / selectedRows?.length)?.toFixed(2) || 0}
              %
            </center>
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

StudentView.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    studentdetails: state.studentdetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (studentData) => { dispatch(addStudent(studentData)); },
    attendanceStudent: (attendanceData) => { dispatch(attendanceStudent(attendanceData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentView);
