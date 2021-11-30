import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  Collapse,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  Paper,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));
const apiUrl = 'http://localhost:3000';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name) {
  return {
    name,
    history: [
      {
        VoucherNo: 'MISC',
        Semester: 'Semester',
      },
    ],
  };
}

function Row(props) {
  const { row, fees } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log(row);
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Fees
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Voucher No</TableCell>
                    <TableCell>Narration</TableCell>
                    <TableCell align="right">Fees Amount</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.VoucherNo}
                      </TableCell>
                      <TableCell>{historyRow.Semester}</TableCell>
                      <TableCell align="right">{fees}</TableCell>
                      <TableCell align="right">{fees}</TableCell>
                    </TableRow>
                  ))}
                  <br />
                  <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell colSpan={2} variant="head">Total Fees</TableCell>
                    <TableCell align="right">{fees}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  fees: PropTypes.number,
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Semester-1'),
  createData('Semester-2'),
  createData('Semester-3'),
  createData('Semester-4'),
  createData('Semester-5'),
  createData('Semester-6'),
  createData('Semester-7'),
  createData('Semester-8'),
];

const Finance = ({ className, allSubject, ...rest }) => {
  const classes = useStyles();
  const [programName, setProgramName] = React.useState();
  const [fees, setFees] = React.useState();
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
      const programs = await fetch(`${apiUrl}/v1/users/program-details/${con?.data?.program_id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const progData = await programs.json();
      setProgramName(progData?.data?.name);
      setFees(progData?.data?.fees);
    })();
  }, []);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <center>
        <h4>{programName && programName}</h4>
      </center>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Semesters Fees</TableCell>
              {/* <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} fees={fees} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

Finance.propTypes = {
  className: PropTypes.string,
  allSubject: PropTypes.array.isRequired,
};

export default Finance;
