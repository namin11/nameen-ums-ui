import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
  const classes = useStyles();
  const [allFaculty, setAllFaculty] = React.useState(0);
  const navigate = useNavigate();

  const buttonClick = () => {
    navigate('/app/faculty', { replace: true });
  };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-faculties?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    console.log('datatata', countryArray.data.total);
    if (countryArray.data.total && countryArray.data) {
      setAllFaculty(countryArray.data.total);
    }
  };

  React.useEffect(() => {
    if (!allFaculty) {
      getResponse();
    }
  }, [allFaculty]);

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
              TOTAL FACULTY
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {allFaculty}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {/* <div>MSC IT : 120</div>
            <div>B.Tech : 300</div> */}
          </Typography>
        </Box>
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

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
