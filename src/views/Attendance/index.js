import React from 'react';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
// import Toolbar from '../Toolbar';
// import PropTypes from 'prop-types';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  btnCancle: {
    border: 'solid 1px #b6286a',
    color: '#b6286a',
    backgroundColor: '#fff',
    margin: '10px 0px',
    borderRadius: '20px'
  },
  btnSubmit: {
    color: '#fff',
    backgroundColor: '#b6286a',
    margin: '10px 0px',
    borderRadius: '20px'
  },
}));
const apiUrl = 'https://safe-atoll-64757.herokuapp.com';
// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
//   statusP: {
//     color: 'green',
//     fontWeight: 'bold'
//   },
//   statusA: {
//     color: 'red',
//     fontWeight: 'bold'
//   }
// });

// function createData(name, calories, historyData) {
//   return {
//     name,
//     calories,
//     history: historyData,
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(true);
//   const classes = useRowStyles();

//   return (
//     <>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             &nbsp;
//             {row.name}
//           </IconButton>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Total Attendance</TableCell>
//                     <TableCell>Present Attendance</TableCell>
//                     <TableCell>Percentage</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow>
//                       <TableCell>
//                         {historyRow.class}
//                       </TableCell>
//                       <TableCell>{historyRow.total}</TableCell>
//                       <TableCell>{historyRow.present}</TableCell>
//                       <TableCell>{historyRow.percentage}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const Attendance = (props) => {
  const [allSubject, setAllSubject] = React.useState([]);
  const [allFSubject, setAllFSubject] = React.useState();
  const [rows, setrows] = React.useState([]);
  const classes = useStyles();
  const { userdata } = props;

  const getResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/course-list?limit=200`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });

    const countryArray = await response.json();
    if (countryArray.data.total !== 0) {
      setAllSubject(countryArray.data.rows);
    }
  };

  const getFacultyResponse = async () => {
    const response = await fetch(`${apiUrl}/v1/users/get-faculty-attendance`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Tokens'),
      }
    });
    const countryArray = await response.json();
    if (countryArray.data) {
      setAllFSubject(countryArray.data);
    }
  };

  React.useEffect(() => {
    if (allSubject?.length === 0) {
      getResponse();
    }
    if (!allFSubject) {
      getFacultyResponse();
    }
  }, [allSubject, allFSubject]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`${apiUrl}/v1/users/get-student-attendance`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Tokens'),
        }
      });
      const countryArray = await response.json();
      setrows(countryArray.data);
      console.log('countryArray', countryArray);
    })();
  }, []);
  return (
    <Page
      className={classes.root}
      title="attendance"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <TableContainer component={Paper}>
            {userdata && userdata.user_type === 3 && rows && rows?.length !== 0 && (
              <>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject Name</TableCell>
                      <TableCell>Total Attendence</TableCell>
                      <TableCell>Present Attendence</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allSubject?.map(
                      (sub) => (
                        <TableRow>
                          <TableCell>
                            {sub?.name}
                          </TableCell>
                          <TableCell>
                            {rows && rows?.resultData?.filter(
                              (element) => element.course_id === sub._id
                            )?.length}
                          </TableCell>
                          <TableCell>
                            {rows && rows?.resultData?.filter(
                              (element) => (element.course_id === sub._id
                            && element?.is_present === true)
                            )?.length}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                    <TableRow>
                      <TableCell>
                        <b>Total</b>
                      </TableCell>
                      <TableCell>
                        <b>{rows && rows.totalAttendance}</b>
                      </TableCell>
                      <TableCell>
                        <b>{rows && rows.presentAttendance}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}><b>Percentage</b></TableCell>
                      <TableCell>
                        <b>{rows && rows.presentAttendancePercentage ? `${Number.isNaN(parseFloat(rows.presentAttendancePercentage)) ? '' : rows.presentAttendancePercentage}%` : '0%'}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <br />
                <br />
                <ResponsiveContainer width="70%" height={300}>
                  <BarChart data={
                     allSubject?.map(
                       (sub) => {
                         return {
                           x: sub.name,
                           y: rows && rows?.resultData?.filter(
                             (element) => (element.course_id === sub._id)
                           )?.length,
                           Attendance: rows && rows?.resultData?.filter(
                             (element) => (element.course_id === sub._id
                      && element?.is_present === true)
                           )?.length
                         };
                       }
                     )
                  }
                  >
                    <XAxis dataKey="x" tick={{ fontSize: 11 }} interval={0} height={30} />
                    <YAxis dataKey="y" />
                    <Tooltip />
                    <Bar dataKey="Attendance" fill="rgba(106, 110, 229)" />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
            {userdata && userdata.user_type === 2 && allFSubject && (
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Attendance Sheet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Total Attendance
                    </TableCell>
                    <TableCell>{allFSubject && allFSubject.totalAttendance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Present Attendance
                    </TableCell>
                    <TableCell>{allFSubject && allFSubject.presentAttendance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Percentage
                    </TableCell>
                    <TableCell>{allFSubject && allFSubject.presentAttendancePercentage && Number.isNaN(rows.presentAttendancePercentage) ? rows.presentAttendancePercentage : '0%'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </Container>
    </Page>
  );
};

Attendance.propTypes = {
  userdata: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userdata: state.userdata && state.userdata.data && state.userdata.data,
  };
};

export default connect(mapStateToProps, null)(Attendance);
