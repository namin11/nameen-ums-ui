import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/profile',
    icon: UsersIcon,
    title: 'Profile'
  },
  {
    href: '/app/attendance',
    icon: AlertCircleIcon,
    title: 'Attendance'
  },
  {
    href: '/app/query',
    icon: UserIcon,
    title: 'Query'
  },
  {
    href: '/app/Assignment',
    icon: ShoppingBagIcon,
    title: 'Assignment'
  },
  {
    href: '/changepassword',
    icon: LockIcon,
    title: 'Change Password'
  },
  {
    href: '/404',
    icon: SettingsIcon,
    title: 'Ragistration'
  },
  {
    href: '/404',
    icon: LockIcon,
    title: 'Fees Status'
  },
  {
    href: '/404',
    icon: UserPlusIcon,
    title: 'Exam'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Result'
  },
];

const adminItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/profile',
    icon: UsersIcon,
    title: 'Profile'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Academic'
  },
  {
    href: '/404',
    icon: UserIcon,
    title: 'Student'
  },
  {
    href: '/404',
    icon: ShoppingBagIcon,
    title: 'Teachers'
  },
  {
    href: '/404',
    icon: LockIcon,
    title: 'Manage Attendance'
  },
  {
    href: '/404',
    icon: LockIcon,
    title: 'Time Table'
  },
  {
    href: '/404',
    icon: LockIcon,
    title: 'Exam schedule'
  },
  {
    href: '/404',
    icon: LockIcon,
    title: 'Announcements'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = (props) => {
  const { userdata, onMobileClose, openMobile } = props;
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {userdata && userdata.data && userdata.data.first_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userdata && userdata.data && userdata.data.user_type === 1 ? 'ADMIN' : 'DEPARTMENT - M.C.A'}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userdata && userdata.data && userdata.data.user_type === 1 ? 'ID - ' : 'RLL NO - '}
          {userdata && userdata.data && userdata.data.register_id}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {userdata && userdata.data && userdata.data.user_type === 1 ? (adminItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
            // icon={item.icon}
            />
          )))
            : (items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
              // icon={item.icon}
              />
            )))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  userdata: PropTypes.string.isRequired
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata,
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, null)(NavBar);
