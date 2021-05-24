import React, { useState } from 'react';
import clsx from 'clsx';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditIcon from '@material-ui/icons/Edit';
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
const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [allQuery, setAllQuery] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedQuery, setSelectedQuery] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteQuery = async (id) => {
    const response = await fetch(`${apiUrl}/v1/contactUs/delete-contactUs-request/${id}`, {
      method: 'DELETE',
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
  const editQuery = async (data) => {
    console.log(data);
    const response = await fetch(`${apiUrl}/v1/contactUs/close-contactUs-request/${data?._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    console.log('delete ', countryArray);
    getResponse();
    // setAllQuery(countryArray.data.contact_request);
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

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editQuery(selectedQuery);
    // rest.editItem(subId._id, values.Subject_name);
    // setOpen(false);
  };
  return (
    <>
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
                            {data?.status !== 0 ? (
                              <>
                                <IconButton color="inherit" onClick={() => { setOpen(true); setSelectedQuery(data); }}>
                                  <EditIcon />
                                </IconButton>
                              </>
                            ) : '-'}
                            <IconButton color="inherit" onClick={() => deleteItem(data._id)}>
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
      <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">REPLAY</DialogTitle>
        <form
          style={{ marginTop: '-20px' }}
          autoComplete="off"
          noValidate
          {...rest}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            Close the query?
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
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  allQuery: PropTypes.array.isRequired
};

export default Results;
