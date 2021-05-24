import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  // Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();

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
              EXAM DATE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              <div>MSC. IT - 03/06/2021</div>
              <div>B. Tech - 04/06/2021</div>
              <div>M. desh - 01/07/2021</div>
            </Typography>
          </Grid>
          <Grid item>
            {/* <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar> */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
