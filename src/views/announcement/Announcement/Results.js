import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, allCourse, ...rest }) => {
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
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                {(rest.userdata && rest.userdata.user_type !== 3)
                  ? (
                    <TableCell>
                      Action
                    </TableCell>
                  ) : ''}
              </TableRow>
            </TableHead>
            <TableBody>

              {rest.total !== 0 && allCourse && allCourse.map((data) => (
                <TableRow
                  hover
                  key={data._id}
                // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell style={{ width: '20%', verticalAlign: 'top' }}>
                    {data.title}
                  </TableCell>
                  <TableCell>
                    {data.description}
                  </TableCell>
                  {(rest.userdata && rest.userdata.user_type !== 3)
                    ? (
                      <TableCell>
                        <IconButton color="inherit" onClick={() => rest.editItem(data._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => rest.deleteItem(data._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : ''}
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={allCourse ? allCourse.length : 0}
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
  allCourse: PropTypes.array.isRequired
};

export default Results;
