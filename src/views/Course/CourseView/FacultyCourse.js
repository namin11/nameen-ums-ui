import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));
const apiUrl = 'http://localhost:3000';
const FacultyCourse = ({ className, ...rest }) => {
  const [allCourse, setAllCourse] = useState([]);
  const [allFCourse, setAllFCourse] = useState([]);
  const [newDetails, setNewDetails] = useState([]);
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // eslint-disable-next-line no-unused-vars
  const getFacultyResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/faculty-course-list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.length !== 0) {
      setAllCourse(countryArray.data);
    }
  };

  const getFCourse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/faculty-course-list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data.total !== 0) {
      setAllFCourse(countryArray.data);
    }
    // const rows = countryArray.data && countryArray.data.rows && countryArray.data.rows;
    // const dataF = allCourse && allCourse.map((data) => {
    //   const innerRows = rows.find((element) => element._id === data._id);
    //   console.log('innerRows', innerRows);
    //   return {
    //     _id: data.id,
    //     name: innerRows.name
    //   };
    // });
    // console.log('dataF', dataF);
  };

  React.useEffect(() => {
    // if (allCourse && allCourse.length === 0) {
    //   getFacultyResponse();
    // }
    if (allFCourse && allFCourse?.length === 0) {
      getFCourse();
    }
    if (allCourse && allCourse.length !== 0 && allFCourse.length !== 0 && allFCourse) {
      const dataFF = allCourse?.map((data) => {
        const innerRows = allFCourse?.find((element) => element._id === data.course_id);
        return {
          _id: data._id,
          name: innerRows.name
        };
      });
      setNewDetails(dataFF);
    }
  }, [allCourse, allFCourse]);

  console.log('newDetails', newDetails);
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          ALL SUBJECTS
          <br />
          <br />
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
                        SUBJECT_CODE
                      </TableCell>
                      <TableCell>
                        SUBJECT
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {allFCourse?.length > 0 && allFCourse?.map((data, index) => (
                      <TableRow
                        hover
                        key={data?.course_data?._id}
                      // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                      >
                        <TableCell>
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {data?.course_data?.code}
                        </TableCell>
                        <TableCell>
                          {data?.course_data?.name}
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={allCourse && allCourse.length}
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

FacultyCourse.propTypes = {
  className: PropTypes.string,
  allCourse: PropTypes.array.isRequired
};

export default FacultyCourse;
