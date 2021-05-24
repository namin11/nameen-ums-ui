/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';
import { updateProfileData } from '../../../action';

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
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
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

const useStyles = makeStyles(() => ({
  root: {},
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  // const [country] = useState([]);
  // const [state] = useState([]);
  // const [city] = useState([]);

  const [values, setValues] = useState({
    first_name: rest.userdata.first_name,
    last_name: rest.userdata.last_name,
    father_name: rest.userdata.father_name,
    mother_name: rest.userdata.mother_name,
    date_of_birth: rest.userdata.date_of_birth,
    address: rest.userdata.address,
    email: rest.userdata.email,
    mobile: rest.userdata.mobile,
    state_id: rest.userdata.state_id,
    country_id: rest.userdata.country_id,
    gender: rest.userdata.gender,
    city_id: rest.userdata.city_id
  });

  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pattern.test(values.email)) {
      alert('Please Enter Valid email address!');
    } else {
      const date = new Date(values.date_of_birth);
      const nDate = Date.parse(date);
      const requestBody = {
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
      rest.updateProfileData(JSON.stringify(requestBody));
      rest.handleClickOpen();
    }
    // You should see email and password in console.
    // ..code to submit form to backend here...
  };

  useEffect(() => {
    setValues({
      first_name: rest.userdata.first_name,
      last_name: rest.userdata.last_name,
      father_name: rest.userdata.father_name,
      mother_name: rest.userdata.mother_name,
      date_of_birth: rest.userdata.date_of_birth,
      address: rest.userdata.address,
      email: rest.userdata.email,
      mobile: rest.userdata.mobile,
      state_id: rest.userdata.state_id,
      country_id: rest.userdata.country_id,
      gender: rest.userdata.gender,
      city_id: rest.userdata.city_id
    });
  }, [rest.userdata]);

  const getResponse = async () => {
    if (country.length === 0) {
      const response = await fetch(`${apiUrl}/v1/country/country-list`);
      const countryArray = await response.json();
      setCountry(countryArray.data);
    }
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
    if (rest.userdata.country_id && state.length === 0) {
      getStateResponse(rest.userdata.country_id);
    }
    if (rest.userdata.state_id && city.length === 0) {
      getCityResponse(rest.userdata.state_id);
    }
  }, []);

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

  const getName = (type, value) => {
    let data = '';
    if (type === 'country' && country && country.lenght !== 0) {
      data = country.findIndex((element) => {
        return element._id === value;
      });
      return data === -1 ? '' : country[data].name;
    }
    if (type === 'state' && state && state.lenght !== 0) {
      data = state.findIndex((element) => {
        return element._id === value;
      });
      return data === -1 ? '' : state[data].name;
    }
    if (type === 'city' && city && city.lenght !== 0) {
      data = city.findIndex((element) => {
        return element._id === value;
      });
      return data === -1 ? '' : city[data].name;
    }
    return data;
  };

  return (
    <>
      {rest.view && (
        <Card>
          <CardHeader
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
                First Name
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.first_name}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Last Name
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.last_name}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Father Name
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.father_name}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Mother Name
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.mother_name}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Address
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.address}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Email
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.email}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Date of Birth
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {new Date(values.date_of_birth).toLocaleDateString('en-US')}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Mobile
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.mobile}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Gender
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {rest.userdata.gender}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                City
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {getName('city', rest.userdata.city_id)}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Country
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {getName('country', rest.userdata.country_id)}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                State
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {getName('state', rest.userdata.state_id)}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {!rest.view && (
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
                    label="Date of Birth"
                    type="date"
                    name="date_of_birth"
                    format="YYYY-MM-DD"
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
                    {country.length !== 0 && country && country.map((option) => (
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
                    {state.length !== 0 && state && state.map((option) => (
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
                    {city.length !== 0 && city && city.map((option) => (
                      <option
                        key={option.name}
                        value={option._id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
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
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </>
  );
};

ProfileDetails.propTypes = {
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
    updateProfileData: (updateData) => { dispatch(updateProfileData(updateData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
