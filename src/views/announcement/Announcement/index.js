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
import { addAnnounce } from '../../../action';

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
const Announcement = ({ ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpentwo] = React.useState(false);
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const [allCourse, setAllCourse] = useState([]);
  const [values, setValues] = useState({
    title: '',
    description: '',
    category: '-'
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

  const handleClickOpentwo = () => {
    setOpentwo(true);
  };

  const handleCloseTwo = () => {
    setOpentwo(false);
  };

  const handleChangeTwo = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  // };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-announcement?limit=200`, {
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
      title: values.title,
      category: values.category,
      description: values.description
    };
    rest.addAnnounce(JSON.stringify(requestBody));
    getResponse();
  };

  const handleSubmitTwo = (event) => {
    event.preventDefault();
  };

  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/users/delete-announcement/${id}`, {
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

  const editItem = (id) => {
    const data = allCourse.filter((item) => item._id === id);
    console.log('data :::::', data);
    setValues({
      title: data[0].title,
      description: data[0].description,
      category: '-'
    });
    if (data) {
      handleClickOpentwo();
    }
  };

  useEffect(() => {
    if (allCourse && allCourse.length === 0) {
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
        {(rest.userdata && rest.userdata.user_type === 1)
          && (<Toolbar handleClickOpen={handleClickOpen} />)}
        <Box mt={3}>
          <Results
            userdata={rest.userdata}
            allCourse={allCourse}
            deleteItem={deleteItem}
            total={total}
            editItem={editItem}
          />
        </Box>
      </Container>
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ANNOUNCEMENT</DialogTitle>
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
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              onChange={handleChange}
            />
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
      <Dialog maxWidth="xs" open={openTwo} onClose={handleCloseTwo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">EDIT ANNOUNCEMENT</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmitTwo}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={values.title}
              onChange={handleChangeTwo}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rowsMax={8}
              value={values.description}
              onChange={handleChangeTwo}
            />
          </DialogContent>
          <DialogActions style={{ marginRight: '15px' }}>
            <Button onClick={handleCloseTwo} color="primary" className={classes.btnCancle}>
              Cancel
            </Button>
            <Button onClick={handleCloseTwo} color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </Page>
  );
};

Announcement.propTypes = {
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
    addAnnounce: (announceData) => { dispatch(addAnnounce(announceData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);
