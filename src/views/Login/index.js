import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import UmsLogo from '../../assets/images/ums_logo.png';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginImage from '../../assets/images/Login.jpg';
import { storeUserData } from '../../action';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(../../assets/images/ums_logo.png)',
    // backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  },
  link: {
    color: '#000'
  },
  paper: {
    margin: theme.spacing(18, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    fontSize: '25px',
    color: 'rgb(182, 40, 106)',
    textTransform: 'upperCase'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

function Login(props) {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  const { userdata } = props;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (sessionStorage.getItem('Tokens') !== null) {
      navigate('/app/dashboard', { replace: true });
    } else if (userdata && userdata.status === '1') {
      sessionStorage.setItem('Tokens', userdata.data.tokens);
      navigate('/app/dashboard', { replace: true });
    }
  }, [userdata]);

  const onSubmit = (data) => {
    const requestBody = {
      register_id: data.register_id,
      password: data.password
    };
    props.storeUserData(JSON.stringify(requestBody));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={LoginImage} width="100%" height="100%" alt="aa" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          {
            userdata && userdata.status !== '1' && <Alert severity="error">{userdata.message}</Alert>
          }
          {
            userdata && userdata.status === '1' && <Alert severity="success">{userdata.message}</Alert>
          }
          <div className={classes.avatar}>
            {/* <img src={UmsLogo} alt="bb" /> */}
            Varsity Governance System
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="register_id"
              label="User ID"
              name="register_id"
              inputRef={register({
                required: 'User ID Required',
                minLength: {
                  value: 8,
                  message: 'User ID must have at least 8 characters'
                }
              })}
              autoFocus
            />
            <span style={{ color: 'red' }}>{errors.register_id && <p>{errors.register_id.message}</p>}</span>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={register({
                required: 'Password Required',
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$]).{8,}$/,
                  message: 'Password should be combination of one uppercase, one lower case, one special character, one digit and minimum 8.'
                }
              })}
            />
            <span style={{ color: 'red' }}>{errors.password && <p>{errors.password.message}</p>}</span>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/fpass" variant="body2" className={classes.link}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2" className={classes.link}>
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

Login.propTypes = {
  storeUserData: PropTypes.string.isRequired,
  userdata: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata,
    userDetails: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUserData: (requestBody) => {
      dispatch(storeUserData(requestBody));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
