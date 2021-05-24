import React, { useState } from 'react';
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
  const [open, setOpen] = React.useState(false);
  const [courseId, setCourseId] = useState();
  const [values, setValues] = useState({
    Course_name: courseId?.name,
    Course_fees: courseId?.fees,
  });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    rest.editItem(courseId._id, values);
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
                  PROGRAM
                </TableCell>
                <TableCell>
                  Fees
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rest.total !== 0 && allCourse && allCourse.map((data, index) => (
                <TableRow
                  hover
                  key={data._id}
                // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {data.name}
                  </TableCell>
                  <TableCell>
                    {data.fees}
                  </TableCell>
                  <TableCell>
                    <IconButton color="inherit" onClick={() => { setOpen(true); setCourseId(data); }}>
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
        count={allCourse.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">EDIT PROGRAM</DialogTitle>
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
            <TextField
              autoFocus
              margin="dense"
              id="Course_name"
              name="Course_name"
              label="Program Name"
              type="text"
              fullWidth
              onChange={handleChange}
              defaultValue={courseId?.name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Course_fees"
              name="Course_fees"
              label="Fees per Semester"
              type="number"
              fullWidth
              defaultValue={courseId?.fees}
              onChange={handleChange}
            />
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
  allCourse: PropTypes.array.isRequired
};

export default Results;
