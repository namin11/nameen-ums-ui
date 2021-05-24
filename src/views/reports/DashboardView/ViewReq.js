import React, { useState } from 'react';
import clsx from 'clsx';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Container,
  TablePagination,
  TableRow,
  makeStyles,
  Chip,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const ViewReq = ({ className, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [allQuery, setAllQuery] = useState([]);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/contactUs/close-contactUs-request/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      },
    });
    const countryArray = await response.json();
    console.log('delete ', countryArray);
    // setAllQuery(countryArray.data.contact_request);
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

  const deleteItem = (id) => {
    deleteQuery(id);
    getResponse();
  };

  React.useEffect(() => {
    if (allQuery && allQuery.length === 0) {
      getResponse();
    }
  }, [allQuery]);

  return (
    <Page
      className={classes.root}
      title="allQuery"
    >
      <Container maxWidth={false}>
        {/* <Toolbar handleClickOpen={handleClickOpen} /> */}
        <Box mt={3}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Sr. No.
                      </TableCell>
                      <TableCell>
                        Name
                      </TableCell>
                      <TableCell>
                        Email
                      </TableCell>
                      <TableCell>
                        Query Type
                      </TableCell>
                      <TableCell>
                        Description
                      </TableCell>
                      <TableCell>
                        Status
                      </TableCell>
                      <TableCell>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allQuery && allQuery.map((data, index) => (
                      <TableRow
                        hover
                        key={data._id}
                      // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                      >
                        <TableCell>
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {data.username}
                        </TableCell>
                        <TableCell>
                          {data.email}
                        </TableCell>
                        <TableCell>
                          {data.type}
                        </TableCell>
                        <TableCell>
                          {data.query}
                        </TableCell>
                        <TableCell style={{ color: 'green', fontWeight: 'bold' }}>
                          <Chip
                            color="primary"
                            label={data.status === 0 ? 'close' : 'Pending'}
                            size="small"
                            style={data.status === 0 ? { backgroundColor: 'green' } : { backgroundColor: 'blue' }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton color="inherit" onClick={() => deleteItem(data._id)}>
                            {data.status === 1 ? <DeleteIcon /> : '-'}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={allQuery && allQuery.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

ViewReq.propTypes = {
  className: PropTypes.string,
  allQuery: PropTypes.array.isRequired
};

export default ViewReq;
