/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  // Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  // TablePagination,
  TableRow,
  // CardContent,
  // Divider,
  // Grid,
  Typography,
  makeStyles,
  IconButton,
  Button
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { saveAs } from 'file-saver';
import moment from 'moment';
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    padding: '10px',
    color: 'white',
    width: '100%',
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  addbtn: {
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    float: 'right',
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  },
}));
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const ProductCard = ({ className, StudentId, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [userData, setUser] = useState();
  const [assignmentData, setAssignmentData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [fileAssignment, setFileAssignment] = React.useState();
  const [msg, setMsg] = React.useState('');
  const [error, setError] = React.useState();
  const getAssignments = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-student-assignment-file/${StudentId?._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    console.log(countryArray);
    if (countryArray.data.length !== 0) {
      setAssignmentData(countryArray.data);
    }
  };
  const [values, setValues] = useState({
    description: '',
    submission_date: '-',
    Subject_code: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const getCourses = async () => {
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
      setSubjectData(countryArray.data.rows);
    }
  };
  useEffect(() => {
    (async () => {
      getAssignments();
      getCourses();
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
  const DownloadFile = async (url) => {
    saveAs(`${apiUrl}/${url?.replace(/\\/g, '/')}`, 'image.jpg');
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleChangeProfile = (event) => {
    setFileAssignment(event.target.files[0]);
  };
  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/users/delete-assignment/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
    });
    const countryArray = await response.json();
    console.log('delete ', countryArray);
    getAssignments();
    // setAllQuery(countryArray.data.contact_request);
  };
  const deleteItem = (id) => {
    deleteQuery(id);
  };
  const Edit = async () => {
    const responseAdd = await fetch(`${apiUrl}/v1/users/edit-assignment`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: JSON.stringify({
        _id: values?._id,
        course_id: values.Subject_code,
        description: values.description,
        submission_date: values.submission_date
      }),
    });
    const countryArray = await responseAdd.json();
    console.log('delete ', countryArray);
    let data = '';
    data = new FormData();
    data.append('assignment', fileAssignment);
    data.append('assignment_id', countryArray.data._id);
    fetch(`${apiUrl}/v1/users/upload-assignment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: data,
    }).then((response) => {
      setError('');
      setMsg('Sucessfully uploaded profile file');
      console.log('response', response);
    }).catch((err) => {
      setError(err);
    });
    getAssignments();
  };
  const add = async () => {
    const responseAdd = await fetch(`${apiUrl}/v1/users/add-assignment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: JSON.stringify({
        course_id: values.Subject_code,
        description: values.description,
        submission_date: values.submission_date
      }),
    });
    const countryArray = await responseAdd.json();
    console.log('delete ', countryArray.data._id);
    let data = '';
    data = new FormData();
    data.append('assignment', fileAssignment);
    data.append('assignment_id', countryArray.data._id);
    fetch(`${apiUrl}/v1/users/upload-assignment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: data,
    }).then((response) => {
      setError('');
      setMsg('Sucessfully uploaded profile file');
      console.log('response', response);
    }).catch((err) => {
      setError(err);
    });
    getAssignments();
    // getResponse();
  };
  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    add();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    Edit();
  };

  return (
    <>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <center>
          <Typography variant="h4">Assignment Details</Typography>
        </center>
      </Card>
      <br />
      {/* <Button
        className={classes.addbtn}
        color="secondary"
        size="small"
        variant="contained"
        onClick={() => handleClickOpen()}
      >
        Add Assignment
      </Button> */}
      <br />
      <br />
      <Card
        className={clsx(classes.root1, className)}
        {...rest}
      >
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Sr.No
                  </TableCell>
                  <TableCell>
                    Course
                  </TableCell>
                  {userData && (userData?.user_type === 2 || userData?.user_type === 1) ? (
                    <TableCell>
                      View Assignment
                    </TableCell>
                  ) : ''}
                </TableRow>
              </TableHead>
              <TableBody>
                {assignmentData
                && assignmentData?.length > 0 && assignmentData?.map((data, index) => (
                  <TableRow hover>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {subjectData?.filter((sub) => sub._id === data.course_id)[0]?.name}
                    </TableCell>
                    <TableCell>
                      {console.log(data)}
                      {data?.assignmentfile
                        ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => DownloadFile(data.assignmentfile)}
                          >
                            View
                          </Button>
                        )
                        : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Assignment</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmitAdd}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            {/* <Button color="primary" fullWidth variant="text" component="label">
              Upload Assignment
              <input
                type="file"
                name="avatar"
                id="file"
                style={{ display: 'none' }}
                accept=".pdf, .png, .jpg"
                onChange={handleChangeProfile}
              />
            </Button> */}
            <h4 style={{ color: 'red' }}>{error}</h4>
            <h4 style={{ color: 'green' }}>{msg}</h4>
            <TextField
              fullWidth
              label="Select Subject"
              name="Subject_code"
              onChange={handleChange}
              required
              select
            >
              {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
              {subjectData && subjectData?.map((option) => (
                <option
                  key={option._id}
                  value={option._id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              multiline
              rowsMax={6}
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              name="submission_date"
              label="Submission Date"
              multiline
              rowsMax={6}
              type="date"
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
      <Dialog maxWidth="xs" open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Assignment</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <Button color="primary" fullWidth variant="text" component="label">
              Upload Assignment
              <input
                type="file"
                name="avatar"
                id="file"
                style={{ display: 'none' }}
                accept=".pdf, .png, .jpg"
                onChange={handleChangeProfile}
              />
            </Button>
            <h4 style={{ color: 'red' }}>{error}</h4>
            <h4 style={{ color: 'green' }}>{msg}</h4>
            <TextField
              fullWidth
              label="Select Subject"
              name="Subject_code"
              onChange={handleChange}
              required
              select
            >
              {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
              {subjectData && subjectData?.map((option) => (
                <option
                  key={option._id}
                  value={option._id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              multiline
              rowsMax={6}
              type="text"
              fullWidth
              value={values?.description}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              name="submission_date"
              label="Submission Date"
              multiline
              rowsMax={6}
              type="date"
              fullWidth
              value={values?.submission_date}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions style={{ marginRight: '15px' }}>
            <Button onClick={handleCloseEdit} color="primary" className={classes.btnCancle}>
              Cancel
            </Button>
            <Button onClick={handleCloseEdit} color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  StudentId: PropTypes.object.isRequired,
};

export default ProductCard;
