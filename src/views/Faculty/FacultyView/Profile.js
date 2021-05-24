import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Avatar,
  TextField,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';
import { updateProfileDataAdmin } from '../../../action';

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

const useStyles = makeStyles(() => ({
  root: {},
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
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
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
  const [userData, setUser] = React.useState();
  const { FacultyId } = state;
  const navigate = useNavigate();
  // const [country] = useState([]);
  // const [state] = useState([]);
  // const [city] = useState([]);

  const [values, setValues] = useState({
    _id: FacultyId._id,
    first_name: FacultyId.first_name,
    last_name: FacultyId.last_name,
    father_name: FacultyId.father_name,
    mother_name: FacultyId.mother_name,
    date_of_birth: FacultyId.date_of_birth,
    address: FacultyId.address,
    email: FacultyId.email,
    mobile: FacultyId.mobile,
    state_id: FacultyId.state_id,
    country_id: FacultyId.country_id,
    gender: FacultyId.gender,
    city_id: FacultyId.city_id
  });

  const handleSubmit = (event) => {
    console.log(values, FacultyId, userData);
    event?.preventDefault();
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
    navigate('/app/Faculty', { replace: true });
    // You should see email and password in console.
    // ..code to submit form to backend here...
  };

  const handleChangeProfile = (event) => {
    setFileProfile(event.target.files[0]);
  };

  const handleChangeAdhar = (event) => {
    setFileAdhar(event.target.files[0]);
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

  const uploadData = async (data) => {
    await fetch(`${apiUrl}/v1/users/upload-profile-pic`, {
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
  };

  const uploadAdhar = async (dataAdhar) => {
    await fetch(`${apiUrl}/v1/users/upload-aadhaar-card`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: dataAdhar,
    }).then((response) => {
      setErrorAdhar('');
      setMsgAdhar('Sucessfully uploaded Aadhar file');
      console.log('response', response);
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
    dataAdhar.append('user_id', FacultyId?._id);
    await uploadAdhar(dataAdhar);
  };

  const uploadImage = async (e) => {
    e?.preventDefault();
    let data = '';
    data = new FormData();
    data.append('profile_pic', fileProfile);
    data.append('user_id', FacultyId?._id);
    await uploadData(data);
  };

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
    if (rest.userdata.country_id && StateID.length === 0) {
      getStateResponse(rest.userdata.country_id);
    }
    if (rest.userdata.state_id && city.length === 0) {
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

  const getName = (type, value) => {
    let data = '';
    if (type === 'country' && country && country?.lenght !== 0) {
      data = country.findIndex((element) => {
        return element._id === value;
      });
      return data === -1 ? '' : country[data].name;
    }
    if (type === 'state' && StateID && StateID?.lenght !== 0) {
      data = StateID.findIndex((element) => {
        return element._id === value;
      });
      return data === -1 ? '' : state[data].name;
    }
    if (type === 'city' && city && city?.lenght !== 0) {
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
                {new Date(rest.userdata.date_of_birth).toLocaleDateString('en-US')}
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
                    {StateID.length !== 0 && StateID && StateID.map((option) => (
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
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <center>
                    <Avatar className={classes.avatar} src={`${apiUrl}/${FacultyId?.profile_pic?.replace(/\\/g, '/')}`} />
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
                    <Button onClick={() => uploadImage()} color="primary" className={classes.btnSubmit} type="submit">
                      upload profile
                    </Button>
                  </center>
                  <h4 style={{ color: 'red' }}>{error}</h4>
                  <h4 style={{ color: 'green' }}>{msg}</h4>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <center>
                    <Avatar className={classes.avatar} src={`${apiUrl}/${FacultyId?.aadhaar_card?.replace(/\\/g, '/')}`} />
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
                    <Button onClick={() => uploadImageAdhar()} color="primary" className={classes.btnSubmit} type="submit">
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
