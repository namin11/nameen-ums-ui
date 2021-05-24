import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { resetStore } from '../../../action';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/profile',
    icon: UsersIcon,
    title: 'My Profile'
  },
  {
    href: '/app/attendance',
    icon: AlertCircleIcon,
    title: 'Attendance'
  },
  {
    href: '/app/Assignment',
    icon: UsersIcon,
    title: 'Assignment'
  },
  {
    href: '/app/StudentSubject',
    icon: UserIcon,
    title: 'Subjects'
  },
  {
    href: '/app/announce',
    icon: AlertCircleIcon,
    title: 'Announcement'
  },
  {
    href: '/app/query',
    icon: UserIcon,
    title: 'Query'
  },
  {
    href: '/changepassword',
    icon: LockIcon,
    title: 'Change Password'
  },
  {
    href: '/app/examtimetable',
    icon: LockIcon,
    title: 'Examination System'
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
    title: 'My Profile'
  },
  {
    href: '/app/course',
    icon: UserIcon,
    title: 'Program'
  },
  {
    href: '/app/subject',
    icon: UserIcon,
    title: 'Subjects'
  },
  {
    href: '/app/Assignment',
    icon: UsersIcon,
    title: 'Assignment'
  },
  {
    href: '/app/querylist',
    icon: UserIcon,
    title: 'Query List'
  },
  {
    href: '/app/student',
    icon: UserIcon,
    title: 'Student'
  },
  {
    href: '/app/faculty',
    icon: ShoppingBagIcon,
    title: 'Faculty'
  },
  {
    href: '/app/examtimetable',
    icon: LockIcon,
    title: 'Examination System'
  },
  {
    href: '/app/announce',
    icon: LockIcon,
    title: 'Announcement'
  },
  {
    href: '/changepassword',
    icon: LockIcon,
    title: 'Change Password'
  },
];

const FacultyItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/profile',
    icon: UsersIcon,
    title: 'My Profile'
  },
  {
    href: '/app/facultycourse',
    icon: UserIcon,
    title: 'Subjects'
  },
  {
    href: '/app/Assignment',
    icon: UsersIcon,
    title: 'Assignment'
  },
  {
    href: '/app/student',
    icon: UserIcon,
    title: 'Student'
  },
  {
    href: '/app/announce',
    icon: SettingsIcon,
    title: 'Announcement'
  },
  {
    href: '/app/examtimetable',
    icon: LockIcon,
    title: 'Examination System'
  },
  {
    href: '/changepassword',
    icon: LockIcon,
    title: 'Change Password'
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
  const navigate = useNavigate();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!userdata || userdata.data === {}) {
      props.resetStore();
      sessionStorage.removeItem('Tokens');
      navigate('/', { replace: true });
    }
  }, [userdata]);
  console.log(userdata);
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
          src={userdata?.profile_pic ? `${apiUrl}/${userdata?.profile_pic?.replace(/\\/g, '/')}` : user.avatar}
          to="/app/profile"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {userdata && userdata.first_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userdata && userdata.user_type === 1 && 'Admin'}
          {userdata && userdata.user_type === 2 && 'Faculty'}
          {userdata && userdata.user_type === 3 && 'Student'}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userdata && userdata.user_type === 3 && `Roll No - ${userdata.register_id}`}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {userdata && userdata.user_type === 1 && (adminItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
            // icon={item.icon}
            />
          )))}

          {userdata && userdata.user_type === 2 && (FacultyItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
            // icon={item.icon}
            />
          )))}

          {userdata && userdata.user_type === 3 && (items.map((item) => (
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
  userdata: PropTypes.string.isRequired,
  resetStore: PropTypes.string.isRequired,
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
    userDetails: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetStore: () => {
      dispatch(resetStore());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
