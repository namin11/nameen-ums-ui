import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  IconButton,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, allStudent, ...rest }) => {
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
    <>
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
                    Register ID
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Parents Name
                  </TableCell>
                  <TableCell>
                    Gender
                  </TableCell>
                  <TableCell>
                    Date of Birth
                  </TableCell>
                  <TableCell>
                    Mobile
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Address
                  </TableCell>
                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rest.total !== 0 && allStudent && allStudent.map((data, index) => (
                  <TableRow
                    hover
                    key={data._id}
                  >
                    {/* _id: "600c02e443fff9127fbce6f9"
                  register_id: "11111234"
                  first_name: "Namin"
                  last_name: "Mansuri"
                  father_name: null
                  mother_name: null
                  mobile: null
                  user_type: 3
                  status: 1
                  gender: "F"
                  date_of_birth: null
                  street: null
                  country_id: null
                  state_id: null
                  city_id: null
                  deleted_at: null
                  password: "$2a$10$PDq1S0qYhOlBLjnV.JVKF.WbOT8Gi2BdAEnohJK0i9lei0bBj5gAO"
                  created_at: 1611399908
                  updated_at: 1612706159 */}
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {data.register_id}
                    </TableCell>
                    <TableCell>
                      {`${data.first_name} ${data.last_name}`}
                    </TableCell>
                    <TableCell>
                      Father:
                      {data.father_name}
                      <br />
                      Mother:
                      {data.mother_name}
                    </TableCell>
                    <TableCell>
                      {data.gender}
                    </TableCell>
                    <TableCell>
                      {new Date(data.date_of_birth).toLocaleDateString('en-US')}
                    </TableCell>
                    <TableCell>
                      {data.mobile}
                    </TableCell>
                    <TableCell>
                      {data.email}
                    </TableCell>
                    <TableCell>
                      {data.address}
                    </TableCell>
                    <TableCell>
                      <IconButton color="inherit" onClick={() => rest.editItem(data)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="inherit" onClick={() => rest.deleteItem(data._id)}>
                        <DeleteIcon />
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
          count={allStudent?.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  allStudent: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    studentdetails: state.studentdetails && state.studentdetails.data && state.studentdetails.data
  };
};

export default connect(mapStateToProps, null)(Results);
