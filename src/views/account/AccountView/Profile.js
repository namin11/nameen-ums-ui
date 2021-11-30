import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { updateProfileData } from '../../../action';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  }
}));
const apiUrl = 'http://localhost:3000';
// const convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);

//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };

//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };
const Profile = ({ className, ...rest }) => {
  const [error, setError] = React.useState();
  const [errorAdhar, setErrorAdhar] = React.useState();
  const [fileProfile, setFileProfile] = React.useState();
  const [fileAdhar, setFileAdhar] = React.useState();
  const [msg, setMsg] = React.useState('');
  const [msgAdhar, setMsgAdhar] = React.useState('');
  const [userData, setUser] = React.useState();
  const handleChangeProfile = (event) => {
    setFileProfile(event.target.files[0]);
  };
  const handleChangeAdhar = (event) => {
    setFileAdhar(event.target.files[0]);
  };
  const updateData = async () => {
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
  };
  const uploadData = async (data) => {
    const response = await fetch(`${apiUrl}/v1/users/upload-profile-pic`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
      body: data,
    });
    const con = await response.json();
    setError('');
    setMsg('Sucessfully uploaded profile file');
    console.log('response', JSON.stringify(con.data));
    rest.updateProfileData(JSON.stringify(con.data));
    updateData();
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

  const uploadImage = async (e) => {
    e.preventDefault();
    let data = '';
    data = new FormData();
    data.append('profile_pic', fileProfile);
    data.append('user_id', userData?._id);
    await uploadData(data);
  };
  const uploadImageAdhar = async (e) => {
    e.preventDefault();
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
    dataAdhar.append('user_id', userData?._id);
    await uploadAdhar(dataAdhar);
  };
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={`${apiUrl}/${userData?.profile_pic?.replace(/\\/g, '/')}`} />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {`${rest && rest.userdata.first_name} ${rest.userdata.last_name}`}
          </Typography>
          <Typography color="textSecondary" variant="h6">
            {rest && rest.userdata.register_id}
          </Typography>
          <h4 style={{ color: 'red' }}>{error}</h4>
          <h4 style={{ color: 'red' }}>{errorAdhar}</h4>
          <h4 style={{ color: 'green' }}>{msg}</h4>
          <h4 style={{ color: 'green' }}>{msgAdhar}</h4>
          <br />
        </Box>
      </CardContent>
      <Divider />
      <br />
      <CardActions>
        {!rest.view && (
          <div
            style={{ display: 'grid', justifyContent: 'center', width: '100%' }}
          >
            <form
              style={{ marginTop: '-20px' }}
              autoComplete="off"
              noValidate
              {...rest}
              onSubmit={uploadImage}
            >
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
                <Button color="primary" className={classes.btnSubmit} type="submit">
                  upload profile
                </Button>
              </center>
            </form>
            <br />
            <form
              style={{ marginTop: '-20px' }}
              autoComplete="off"
              noValidate
              {...rest}
              onSubmit={uploadImageAdhar}
            >
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
                <Button color="primary" className={classes.btnSubmit} type="submit">
                  upload aadhar
                </Button>
              </center>
            </form>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  userdata: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
    userDetails: state.userDetails
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileData: (updateData) => { dispatch(updateProfileData(updateData)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
