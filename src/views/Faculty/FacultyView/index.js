import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
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
import { addFaculty, assignFaculty, attendanceFaculty } from '../../../action';

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
  },
  dialogPaper: {
    minHeight: 'auto',
    maxHeight: '50vh',
    minWidth: '350px',
    maxWidth: '40%'
  },
}));
const apiUrl = 'http://localhost:3000';
const FacultyView = ({ ...rest }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [opentwo, setOpentwo] = React.useState(false);
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const { handleSubmit, register, errors } = useForm();
  const [allFaculty, setAllFaculty] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // const [valuestwo, setValuestwo] = useState({
  //   Subject_code: '',
  //   faculty_id: ''
  // });

  const [values, setValues] = useState({
    first_name: 'male',
    last_name: '',
    r_id: '',
    password: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpentwo = () => {
    if (allFaculty && total !== 0) {
      allFaculty.map((items) => {
        items.isChecked = false;
        console.log('data selected', items);
        return items;
      });
      setSelectedRows(allFaculty);
    } else if (total === 0) {
      setSelectedRows([]);
    }
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

  // const handleChangetwo = (event) => {
  //   console.log('event.target', event.target.name);
  //   setValuestwo({
  //     ...valuestwo,
  //     [event.target.name]: event.target.value
  //   });
  // };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  // };

  const handleSubmittwo = (event) => {
    event.preventDefault();
    console.log('event', event);
    // console.log('assign valuestwo', valuestwo);
    if (selectedRows) {
      // let selectedList = selectedRows.filter((items) => items.isChecked !== false);
      const selectedList = selectedRows.map((items) => {
        return {
          faculty_id: items._id,
          is_present: items.isChecked
        };
      });

      const requestBody = {
        faculty_ids: selectedList
      };
      rest.attendanceFaculty(JSON.stringify(requestBody));
      console.log('aa', requestBody);
      console.log('selectedList', selectedList);
    }
  };

  const getResponse = async () => {
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
    if (countryArray.data.total === 0) {
      setTotal(0);
    } else {
      setTotal(countryArray.data.total);
    }
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

  const deleteItem = (id) => {
    deleteQuery(id);
  };

  const editItem = (FacultyId) => {
    console.log(FacultyId);
    navigate('/app/FacultyProfile', { state: { FacultyId } });
  };

  useEffect(() => {
    if (allFaculty.length === 0) {
      getResponse();
    }
  }, [allFaculty]);

  useEffect(() => {
    if (rest.facultydetails && rest.facultydetails.status === '1') {
      getResponse();
    }
  }, [rest.facultydetails]);

  const onSelectClick = (row) => {
    const newSelectedRow = selectedRows.map((item) => {
      if (item._id === row._id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return { ...item };
    });
    setSelectedRows(newSelectedRow);
  };

  // useEffect(() => {
  //   if (allFaculty) {
  //     console.log('insert');
  //     allFaculty.map((items) => {
  //       items.isChecked = true;
  //       console.log('data selected', items);
  //       return items;
  //     });
  //     setSelectedRows(allFaculty);
  //   }
  // }, []);

  const onSubmit = () => {
    const requestBody = {
      register_id: values.r_id,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name
    };
    rest.addFaculty(JSON.stringify(requestBody));
    handleClose();
    getResponse();
  };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar handleClickOpen={handleClickOpen} handleClickOpentwo={handleClickOpentwo} />
        {
          rest.facultydetails && rest.facultydetails.status !== '1' && <Alert severity="error">{rest.facultydetails.message}</Alert>
        }
        <Box mt={3}>
          <Results
            allFaculty={allFaculty}
            deleteItem={deleteItem}
            total={total}
            editItem={editItem}
          />
        </Box>
      </Container>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CREATE FACULTY</DialogTitle>
        <form
          style={{ marginTop: '-20px', width: '400px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
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
            <span style={{ color: 'red' }}>{errors.first_name && <p>{errors.first_name.message}</p>}</span>

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
            <span style={{ color: 'red' }}>{errors.last_name && <p>{errors.last_name.message}</p>}</span>

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
            <span style={{ color: 'red' }}>{errors.r_id && <p>{errors.r_id.message}</p>}</span>

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
            <span style={{ color: 'red' }}>{errors.password && <p>{errors.password.message}</p>}</span>
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
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmittwo}
        >
          <DialogContent>
            {(selectedRows && selectedRows.length !== 0) ? (selectedRows.map((row) => (
              <div style={{ display: 'block' }}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={row.isChecked}
                      onChange={() => onSelectClick(row)}
                    />
                  )}
                  label={`${row.first_name} ${row.last_name}`}
                />
              </div>
            )))
              : (
                <span>No Faculty</span>
              )}
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

FacultyView.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    facultydetails: state.facultydetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFaculty: (FacultyData) => { dispatch(addFaculty(FacultyData)); },
    assignFaculty: (assignData) => { dispatch(assignFaculty(assignData)); },
    attendanceFaculty: (attendanceData) => { dispatch(attendanceFaculty(attendanceData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacultyView);
