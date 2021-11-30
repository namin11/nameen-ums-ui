import React, { useState } from 'react';
import clsx from 'clsx';
// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  // Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// const data = [
//   {
//     id: uuid(),
//     ref: 'CDD1049',
//     amount: 30.5,
//     customer: {
//       name: 'Ramesh Vora'
//     },
//     createdAt: 1555016400000,
//     status: 'paid',
//     course: 'MSC. IT'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1048',
//     amount: 25.1,
//     customer: {
//       name: 'Ravi Patel'
//     },
//     createdAt: 1555016400000,
//     status: 'unpaid',
//     course: 'MSC. IT'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1047',
//     amount: 10.99,
//     customer: {
//       name: 'Bhumi Patel'
//     },
//     createdAt: 1554930000000,
//     status: 'unpaid',
//     course: 'MSC. IT'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1046',
//     amount: 96.43,
//     customer: {
//       name: 'Riddhi Vora'
//     },
//     createdAt: 1554757200000,
//     status: 'paid',
//     course: 'MSC. IT'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1045',
//     amount: 32.54,
//     customer: {
//       name: 'Mallika Modi'
//     },
//     createdAt: 1554670800000,
//     status: 'paid',
//     course: 'MSC. IT'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1044',
//     amount: 16.76,
//     customer: {
//       name: 'Adam'
//     },
//     createdAt: 1554670800000,
//     status: 'paid',
//     course: 'MSC. IT'
//   }
// ];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));
const apiUrl = 'http://localhost:3000';
const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [orders] = useState(data);
  const [allStudent, setAllStudent] = useState([]);
  const [allAnnounce, setAllAnnounce] = useState([]);
  const navigate = useNavigate();

  const buttonClick = () => {
    navigate('/app/announce', { replace: true });
  };

  const buttonClickTwo = () => {
    navigate('/app/student', { replace: true });
  };

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-students?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total !== 0 && countryArray.data) {
      const array = countryArray.data.rows;
      const shortArray = array && array.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setAllStudent(shortArray);
    }
  };

  const getResponseAnnounce = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-all-announcement?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total !== 0 && countryArray.data) {
      setAllAnnounce(countryArray.data.rows);
    }
  };

  React.useEffect(() => {
    if (allStudent?.length === 0) {
      getResponse();
    }
    if (allAnnounce?.length === 0) {
      getResponseAnnounce();
    }
  }, [allStudent, allAnnounce]);

  return (
    rest.userdata && rest.userdata.user_type === 1
      ? (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardHeader title="NEW STUDENT LIST" />
          <Divider />
          <PerfectScrollbar>
            <Box minWidth={600} maxHeight={250}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Ragister ID
                    </TableCell>
                    <TableCell>
                      NAME
                    </TableCell>
                    <TableCell>
                      DATE OF BIRTH
                    </TableCell>
                    <TableCell>
                      Email
                    </TableCell>
                    <TableCell>
                      Mobile
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allStudent && allStudent.slice(0, 10).map((order) => (
                    <TableRow
                      hover
                      key={order._id}
                    >
                      <TableCell>
                        {order.register_id}
                      </TableCell>
                      <TableCell>
                        {order.first_name}
                      </TableCell>
                      <TableCell>
                        {new Date(order.date_of_birth).toLocaleDateString('en-US')}
                      </TableCell>
                      <TableCell>
                        {order.email}
                      </TableCell>
                      <TableCell>
                        {order.mobile}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
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
      : (
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardHeader title="Announcement" />
          <Divider />
          <PerfectScrollbar>
            <Box minWidth={600}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Title
                    </TableCell>
                    <TableCell>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allAnnounce && allAnnounce.slice(0, 5).map((order) => (
                    <TableRow
                      hover
                      key={order._id}
                    >
                      <TableCell style={{ width: '25%', verticalAlign: 'top' }}>
                        {order.title}
                      </TableCell>
                      <TableCell>
                        {order.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
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
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
