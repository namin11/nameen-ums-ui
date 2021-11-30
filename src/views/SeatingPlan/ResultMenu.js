/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  Collapse,
  Table,
  Button,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundImage: 'linear-gradient(to right, rgb(218, 93, 87) 17%, rgb(182, 40, 106) 95%)',
    padding: '10px',
    color: 'white',
    width: '100%',
  },
  avatar: {
    cursor: 'pointer',
    width: 150,
    height: 150,
  },
  avatarImg: {
    padding: 40
  }
}));
const apiUrl = 'http://localhost:3000';
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        Description: 'End Term Exam',
        MaximumMark: '',
        ObtainMarks: '',
        WeightMaximumMarks: '',
        WeightObtainMarks: '',
      },
      {
        Description: 'Mid Term Exam',
        MaximumMark: '',
        ObtainMarks: '',
        WeightMaximumMarks: '',
        WeightObtainMarks: '',
      },
      {
        Description: 'CA',
        MaximumMark: '',
        ObtainMarks: '',
        WeightMaximumMarks: '',
        WeightObtainMarks: '',
      },
      {
        Description: 'Attendance',
        MaximumMark: '',
        ObtainMarks: '',
        WeightMaximumMarks: '',
        WeightObtainMarks: '',
      },
      {
        Description: 'Total',
        MaximumMark: '',
        ObtainMarks: '',
        WeightMaximumMarks: '',
        WeightObtainMarks: '',
      },
    ],
  };
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  // eslint-disable-next-line react/prop-types
  const { row, allSubject } = props;
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // eslint-disable-next-line consistent-return
  function attendance(total) {
    if (total > 95 && total <= 100) return 5;
    if (total > 90 && total < 95) return 4;
    if (total > 85 && total < 90) return 3;
    if (total > 80 && total < 85) return 2;
    if (total > 75 && total < 80) return 1;
    if (total < 75) return 0;
  }
  // eslint-disable-next-line prefer-const
  const attendanceMark = attendance(parseInt(row?.presentAttendancePercentage, 10));
  const totalMarks = row?.ete + row?.mte
    + parseInt((row?.ca1 + row?.ca2 + row?.ca3) / 3, 10) || 0 + attendanceMark;
  // eslint-disable-next-line consistent-return
  function gradeMark(total) {
    if (total >= 90 && total <= 100) return 'A';
    if (total >= 80 && total < 90) return 'B';
    if (total >= 70 && total < 80) return 'C';
    if (total >= 40 && total < 70) return 'D';
    if (total < 40) return 'fail';
  }
  const grade = gradeMark(totalMarks);
  return (
    <>
      <TableRow className={classes.root1}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {/* eslint-disable-next-line react/prop-types */}
          {allSubject?.filter((data) => data?._id === row?.course_id)[0]?.name}
        </TableCell>
        <TableCell>100</TableCell>
        <TableCell>
          {totalMarks}
        </TableCell>
        <TableCell>
          {grade}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Result
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>End Term Exam</TableCell>
                    <TableCell>Mid Term Exam</TableCell>
                    <TableCell>CA1</TableCell>
                    <TableCell>CA2</TableCell>
                    <TableCell>CA3</TableCell>
                    <TableCell>Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row?.ete}</TableCell>
                    <TableCell>{row?.mte}</TableCell>
                    <TableCell>{row?.ca1}</TableCell>
                    <TableCell>{row?.ca2}</TableCell>
                    <TableCell>{row?.ca3}</TableCell>
                    <TableCell>{attendanceMark}</TableCell>
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
  row: PropTypes.shape({
    ca1: PropTypes.number,
    ca2: PropTypes.number,
    ca3: PropTypes.number,
    ete: PropTypes.number,
    mte: PropTypes.number,
    course_id: PropTypes.any,
    type: PropTypes.number,
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
    presentAttendancePercentage: PropTypes.any,
  }).isRequired,
};

// eslint-disable-next-line no-unused-vars
const rows = [
  createData('Java', 159, 6.0, 'A'),
  createData('.Net', 237, 9.0, 'C'),
  createData('Python', 262, 16.0, 'B'),
  createData('Object-Oriented Programming System', 305, 3.7, 'B+'),
  createData('JavaScript', 356, 16.0, 'A+'),
];

const Semester = [
  {
    type: 1,
    No: 'sem 1',
  },
  {
    type: 2,
    No: 'sem 2',
  },
  {
    type: 3,
    No: 'sem 3',
  },
  {
    type: 4,
    No: 'sem 4',
  },
  {
    type: 5,
    No: 'sem 5',
  },
  {
    type: 6,
    No: 'sem 6',
  },
  {
    type: 7,
    No: 'sem 7',
  },
  {
    type: 8,
    No: 'sem 8',
  },
];
const ResultMenu = ({ className, userdata, ...rest }) => {
  const classes = useStyles();
  const [resultData, setResultData] = React.useState([]);
  const [allSubject, setAllSubject] = React.useState([]);
  useEffect(() => {
    (async () => {
      const responseSub = await fetch(`${apiUrl}/v1/users/course-list?limit=200`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const countryArray = await responseSub.json();
      if (countryArray.data.total !== 0) {
        setAllSubject(countryArray.data.rows);
      }
    })();
  }, []);

  const getResponseattendance = async (type) => {
    const response = await fetch(`${apiUrl}/v1/users/student-result-sem?type=${type}&&student_id=${userdata?._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    setResultData(countryArray.data);
    console.log('countryArray', countryArray);
  };

  const handleClick = (type) => {
    getResponseattendance(type);
  };

  return (
    <>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <center>
          <Typography variant="h4">Student Result Details</Typography>
        </center>
      </Card>
      {Semester && Semester.map((sem) => (
        <Button
          style={{ width: 'max-content', margin: '10px' }}
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleClick(sem.type)}
        >
          {sem?.No}
        </Button>
      ))}
      <br />
      <Card
        className={clsx(classes.root1, className)}
        {...rest}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Subject</TableCell>
                <TableCell>Total Mark</TableCell>
                <TableCell>Obtain Mark</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultData && resultData.map((data) => (
                <Row key={data._id} row={data} allSubject={allSubject} />
              ))}
              {/* {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

ResultMenu.propTypes = {
  className: PropTypes.string,
  userdata: PropTypes.string
};
const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
  };
};

export default connect(mapStateToProps)(ResultMenu);
