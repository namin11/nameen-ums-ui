import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const TasksProgress = ({ className, ...rest }) => {
  const classes = useStyles();
  const [allCourse, setAllCourse] = React.useState(0);
  const navigate = useNavigate();

  const buttonClick = () => {
    navigate('/app/course', { replace: true });
  };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/program-list?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total && countryArray.data) {
      setAllCourse(countryArray.data.total);
    }
  };

  React.useEffect(() => {
    if (!allCourse) {
      getResponse();
    }
  }, [allCourse]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL COURSES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {allCourse}
            </Typography>
            <Box
              mt={2}
              display="flex"
              alignItems="center"
            >
              <Typography
                className={classes.differenceValue}
                variant="body2"
              >
                {/* <div>MSC IT</div>
                <div>B.Tech</div> */}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MenuBookIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >

          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            onClick={buttonClick}
          >
            More Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
