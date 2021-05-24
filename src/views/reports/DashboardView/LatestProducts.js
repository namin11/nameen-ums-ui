import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  // IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [allQuery, setAllQuery] = React.useState([]);
  const navigate = useNavigate();

  console.log('rest.userdata.first_name', rest.userdata);
  const buttonClick = () => {
    navigate('/app/querylist', { replace: true });
  };

  const buttonClickTwo = () => {
    navigate('/app/profile', { replace: true });
  };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/contactUs/get-contactUs-list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    console.log('response ', countryArray);
    if (countryArray.data.total !== 0) {
      setAllQuery(countryArray.data.contact_request);
    }
  };

  React.useEffect(() => {
    if (allQuery && allQuery.length === 0) {
      getResponse();
    }
  }, [allQuery]);

  return (
    rest.userdata && rest.userdata.user_type === 1
      ? (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardHeader
            subtitle={`${allQuery && allQuery.length} in total`}
            title="QUERY"
          />
          <Divider />
          <List>
            {allQuery && allQuery.length !== 0 ? (allQuery.map((product, i) => (
              <ListItem
                divider={i < allQuery.length - 1}
                key={product._id}
              >
                <ListItemText
                  primary={product.username}
                  secondary={product.query}
                />
                {/* {product.per} */}
              </ListItem>
            )))
              : (
                <span style={{ paddingLeft: '18px', fontSize: '13px', color: '#404040' }}>No Query</span>
              )}
          </List>
          <Divider />
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
              View all
            </Button>
          </Box>
        </Card>
      )
      : (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardHeader
            subtitle={`${allQuery && allQuery.length} in total`}
            title="Profile"
          />
          <Divider />
          <List>
            <ListItem>
              <ListItemText
                primary={`First Name: ${rest.userdata.first_name}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Last Name: ${rest.userdata.last_name}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Date of Birth ${new Date(rest.userdata.date_of_birth).toLocaleDateString('en-US')}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Email: ${rest.userdata.email ? rest.userdata.email : '----'}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Mobile: ${rest.userdata.mobile ? rest.userdata.mobile : '----'}`}
              />
            </ListItem>
          </List>
          <Divider />
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
              onClick={buttonClickTwo}
            >
              View all
            </Button>
          </Box>
        </Card>
      )
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
