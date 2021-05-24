import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changepassword, resetStore } from '../../action';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    color: '#000'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'rgb(182, 40, 106)',
    borderRadius: '25px',
    '&:hover': {
      background: 'rgb(182, 40, 106)',
    },
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    errors,
    watch
  } = useForm();
  const { cpassdetails, userdata } = props;
  const navigate = useNavigate();
  const password = useRef({});

  password.current = watch('newPass', '');

  const onSubmit = (data) => {
    console.log('data sign up', data);

    const requestBody = {
      old_password: data.oldPass,
      new_password: data.newPass,
      confirm_password: data.confirmPass
    };
    props.changepassword(JSON.stringify(requestBody));
  };

  React.useEffect(() => {
    if (cpassdetails && cpassdetails.status === '1') {
      props.resetStore();
      // sessionStorage.setItem('Tokens', '');
      sessionStorage.removeItem('Tokens');
      navigate('/', { replace: true });
    }
  }, [cpassdetails]);
  console.log('cpassdetails ::', cpassdetails);
  return (
    <Container component="main" maxWidth="xs">
      <br />
      {
        cpassdetails && cpassdetails.status !== '1' && <Alert severity="error">{cpassdetails.message}</Alert>
      }
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.link}>
                Login ID -
                {userdata.register_id}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/app/dashboard" variant="body2" className={classes.link}>
                Return to Home Page
              </Link>
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="oldPass"
            label="Old Password"
            name="oldPass"
            inputRef={register({
              required: 'You must specify a old password',
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$]).{8,}$/,
                message: 'Old Password should be combination of one uppercase, one lower case, one special character, one digit and minimum 8.'
              }
            })}
            autoFocus
          />
          <span style={{ color: 'red' }}>{errors.oldPass && <p>{errors.oldPass.message}</p>}</span>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="newPass"
            label="New Password"
            name="newPass"
            inputRef={register({
              required: 'You must specify a new password',
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$]).{8,}$/,
                message: 'New Password should be combination of one uppercase, one lower case, one special character, one digit and minimum 8.'
              }
            })}
          />
          <span style={{ color: 'red' }}>{errors.newPass && <p>{errors.newPass.message}</p>}</span>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPass"
            label="Confirm Password"
            type="password"
            id="confirmPass"
            inputRef={register({
              validate: (value) => value === password.current || 'The passwords do not match',
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$]).{8,}$/,
                message: 'Confirm Password should be combination of one uppercase, one lower case, one special character, one digit and minimum 8.'
              }
            })}
          />
          <span style={{ color: 'red' }}>{errors.confirmPass && <p>{errors.confirmPass.message}</p>}</span>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

SignIn.propTypes = {
  changepassword: PropTypes.object.isRequired,
  cpassdetails: PropTypes.string.isRequired,
  userdata: PropTypes.object.isRequired,
  resetStore: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cpass: state.cpass && state.cpass,
    cpassdetails: state.cpassdetails && state.cpassdetails,
    userdata: state.userdata && state.userdata.data && state.userdata.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changepassword: (changepass) => {
      dispatch(changepassword(changepass));
    },
    resetStore: () => {
      dispatch(resetStore());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
