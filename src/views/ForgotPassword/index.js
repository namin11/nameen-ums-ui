import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '../../action';

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

function ForgotPassword(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    errors,
    watch
  } = useForm();
  const { fpassdetails } = props;
  const password = useRef({});

  password.current = watch('newPass', '');

  const onSubmit = (data) => {
    console.log('data sign up', data);

    const requestBody = {
      email: data.email,
    };
    props.forgotPassword(JSON.stringify(requestBody));
  };

  return (
    <Container component="main" maxWidth="xs">
      <br />
      {
        fpassdetails && fpassdetails.status !== '1' && <Alert severity="error">{fpassdetails.message}</Alert>
      }
      {
        fpassdetails && fpassdetails.status === '1' && <Alert severity="success">{fpassdetails.message}</Alert>
      }
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            id="email"
            label="Email"
            name="email"
            inputRef={register({
              required: 'You must specify a old password'
            })}
            autoFocus
          />
          <span style={{ color: 'red' }}>{errors.email && <p>{errors.email.message}</p>}</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.object.isRequired,
  fpassdetails: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    fpass: state.fpass && state.fpass,
    fpassdetails: state.fpassdetails && state.fpassdetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (forgotpass) => {
      dispatch(forgotPassword(forgotpass));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
