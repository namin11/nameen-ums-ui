import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import moment from 'moment';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
  Grid,
  IconButton,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  }
}));
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
const Results = ({
  className, allSeating, allSubject, ...rest
}) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [seating, setSeating] = useState();
  const [page, setPage] = useState(0);
  const [subject, setSubject] = useState('');
  const [UserAdmin, setUseradmin] = useState([]);
  //   const [subId, setSubId] = useState();
  const [values, setValues] = useState({
    seatingId: '',
    course_id: allSeating && allSeating[0] && allSeating[0].name,
    roomNumber: '',
    courseName: '',
    reportingTime: '',
    date: '',
    time: '',
  });
  const handleChange = (event) => {
    if (event.target.name === 'course_id' && event.target.value) {
      if (allSubject) {
        const sub = allSubject.find((element) => element._id === event.target.value);
        setSubject(sub.name);
      }
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    rest.editItem(values);
  };
  console.log(values, subject);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    (async () => {
      const response = await fetch(`${apiUrl}/v1/users/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const con = await response.json();
      setUseradmin(con.data);
    })();
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container>
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Sr.No
                  </TableCell>
                  <TableCell>
                    Course
                  </TableCell>
                  <TableCell>
                    Reporting Time
                  </TableCell>
                  <TableCell>
                    Time
                  </TableCell>
                  <TableCell>
                    Room Number
                  </TableCell>
                  <TableCell>
                    Date
                  </TableCell>
                  {UserAdmin && UserAdmin?.user_type === 1 ? (
                    <TableCell>
                      Action
                    </TableCell>
                  ) : ''}
                </TableRow>
              </TableHead>
              <TableBody>

                {rest.total !== 0 && allSeating && allSeating.map((data, index) => (
                  <TableRow hover>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {data.course_name}
                    </TableCell>
                    <TableCell>
                      {data.reporting_time}
                    </TableCell>
                    <TableCell>
                      {data.time}
                    </TableCell>
                    <TableCell>
                      {data.room_number}
                    </TableCell>
                    <TableCell>
                      {new Date(parseInt(data.date, 10)).toLocaleDateString('en-US')}
                    </TableCell>
                    {UserAdmin && UserAdmin.user_type === 1 ? (
                      <TableCell>

                        <IconButton
                          color="inherit"
                          onClick={() => {
                            setOpen(true);
                            setSeating(data);
                            setValues({
                              seatingId: data._id,
                              course_id: data.course,
                              roomNumber: data.room_number,
                              courseName: data.course_name,
                              reportingTime: data.reporting_time,
                              date: parseInt(data.date, 10),
                              time: data.time,
                            });
                          }}
                        >
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
      </Container>
      <TablePagination
        component="div"
        count={allSeating?.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">EDIT Seating</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            {/* <DialogContentText>
          </DialogContentText> */}
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Course"
                  name="course_id"
                  onChange={handleChange}
                  select
                  // SelectProps={{ native: true }}
                  defaultValue={seating?.course}
                  variant="outlined"
                >
                  {allSubject && allSubject.map((data) => (
                    <option
                      key={data._id}
                      value={data._id}
                    >
                      {data.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Room Number"
                  name="roomNumber"
                  onChange={handleChange}
                  value={values?.roomNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Reporting Time"
                  name="reportingTime"
                  type="number"
                  onChange={handleChange}
                  value={values?.reportingTime}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  name="date"
                  format="YYYY-MM-DD"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  value={moment(values.date).format('YYYY-MM-DD')}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="number"
                  onChange={handleChange}
                  value={values?.time}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: '15px' }}>
            <Button onClick={handleClose} color="primary" className={classes.btnCancle}>
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" className={classes.btnSubmit} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  );
};
Results.propTypes = {
  className: PropTypes.string,
  allSeating: PropTypes.array.isRequired,
  allSubject: PropTypes.array.isRequired,
  subject: PropTypes.array.isRequired,
};
export default Results;
