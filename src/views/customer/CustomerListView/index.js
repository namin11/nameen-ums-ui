import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Page from 'src/components/Page';
// import Results from './Results';
import { addquery } from '../../../action';

const queryType = [
  {
    value: 'exam',
    label: 'Exam'
  },
  {
    value: 'fees',
    label: 'Fees'
  },
  {
    value: 'course',
    label: 'Course'
  }
];

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
    borderRadius: '20px',
    float: 'right'
  }
}));

const CustomerListView = ({ ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    email: '',
    Itype: '',
    query: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      email: values.email,
      username: values.name,
      query: values.query,
      type: values.Itype
    };
    console.log('----', values);
    rest.addquery(JSON.stringify(requestBody));
  };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  // };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar handleClickOpen={handleClickOpen} /> */}
        <Box mt={3}>
          {/* <Results /> */}
          {rest.querydetails && rest.querydetails.message && <Alert severity="success">{rest.querydetails.message}</Alert>}
          <form
            style={{ marginTop: '-20px', margin: '0px 10%' }}
            autoComplete="off"
            noValidate
            {...rest}
            onSubmit={handleSubmit}
          >
            <div style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 'normal' }}>
              CONTACT US
            </div>
            {/* <DialogContentText>
          </DialogContentText> */}
            <TextField
              style={{ marginTop: '20px' }}
              margin="dense"
              id="name"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              onChange={handleChange}
            />

            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="text"
              fullWidth
              onChange={handleChange}
            />

            <TextField
              style={{ marginTop: '20px' }}
              fullWidth
              label="Select Type"
              name="Itype"
              onChange={handleChange}
              required
              select
            // SelectProps={{ native: true }}
            >
              {/* <option style={{ color: '#bfbfbf' }}>none </option> */}
              {queryType && queryType.map((option) => (
                <option
                  key={option.label}
                  value={option.label}
                >
                  {option.value}
                </option>
              ))}
            </TextField>
            <TextField
              style={{ marginTop: '20px' }}
              margin="dense"
              id="query"
              label="Query"
              name="query"
              type="text"
              multiline
              rows={4}
              fullWidth
              onChange={handleChange}
            />
            <Button color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

CustomerListView.propTypes = {
  className: PropTypes.string,
  querydetails: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    querydetails: state.querydetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addquery: (queryData) => { dispatch(addquery(queryData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListView);
