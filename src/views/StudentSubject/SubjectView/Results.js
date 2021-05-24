import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, allSubject, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
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
                  SUBJECT CODE
                </TableCell>
                <TableCell>
                  SUBJECT
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {allSubject && allSubject.map((data, index) => (
                <TableRow
                  hover
                  key={data._id}
                // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {data.course_data.code}
                  </TableCell>
                  <TableCell>
                    {data.course_data.name}
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={allSubject && allSubject.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  allSubject: PropTypes.array.isRequired
};

export default Results;
