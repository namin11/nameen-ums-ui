import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { resetStore } from '../../action';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    rest.resetStore();
    // sessionStorage.setItem('Tokens', '');
    sessionStorage.removeItem('Tokens');
    navigate('/', { replace: true });
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
      style={{ backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)' }}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <RouterLink to="/login" style={{ textDecoration: 'none', color: '#fff' }}> */}
          <IconButton color="inherit" onClick={logout}>
            <InputIcon />
          </IconButton>
          {/* </RouterLink> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  resetStore: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetStore: () => {
      dispatch(resetStore());
    }
  };
};

export default connect(null, mapDispatchToProps)(TopBar);
