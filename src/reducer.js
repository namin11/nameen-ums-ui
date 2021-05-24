import { combineReducers } from 'redux';
import {
  GET_VERFIY_SIGN_DETAILS,
  GET_USER_DATA,
  RESET_STORE,
  UPDATE_PROFILE_DATA,
  GET_PROFILE_DATA,
  ADD_COURSE,
  GET_COURSE,
  ADD_STUDENT,
  GET_STUDENT,
  ADD_FACULTY,
  GET_FACULTY,
  ADD_SUBJECT,
  GET_SUBJECT,
  ASSIGN_FACULTY,
  GET_ASSIGN_FACULTY,
  ATTENDANCE_FACULTY,
  GET_ATTENDANCE_FACULTY,
  GET_STUDENT_SUBJECT,
  CHANGE_PASSWORD,
  GET_CHANGE_PASSWORD,
  ADD_QUERY,
  GET_QUERY,
  STUDENT_SUBJECT,
  ATTENDANCE_STUDENT,
  GET_ATTENDANCE_STUDENT,
  ADD_ANNOUNCEMENT,
  GET_ANNOUNCEMENT,
  ADD_TIMETABLE,
  GET_TIMETABLE,
  FORGOT_PASSWORD,
  GET_FORGOT_PASSWORD,
  ADD_NEWTIMETABLE,
  GET_NEWTIMETABLE
} from './action/actionType';

const appReducer = combineReducers({
  state: (state = {}) => state
});

const initState = {
  userdata: '',
  logout: '',
  course: '',
  coursedetails: '',
  student: '',
  studentdetails: '',
  faculty: '',
  facultydetails: '',
  subject: '',
  subjectdetails: '',
  assignsubject: '',
  subjectassign: '',
  fattandance: '',
  getfattandance: '',
  sattandance: '',
  getsattandance: '',
  cpass: '',
  cpassdetails: '',
  fpass: '',
  fpassdetails: '',
  query: '',
  querydetails: '',
  studentSubject: '',
  getStudentSubject: '',
  announce: '',
  announcedetails: '',
  timetable: '',
  timetableDetails: '',
  ntimetable: '',
  ntimetableDetails: ''
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_VERFIY_SIGN_DETAILS:
      return {
        ...state,
        userdata: action.response
      };

    case GET_USER_DATA:
      return {
        ...state,
        userDetails: action.requestBody
      };

    case RESET_STORE:
      state = undefined;

      return appReducer(state, action);

    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        updateData: action.updateData
      };

    case GET_PROFILE_DATA:
      return {
        ...state,
        profileData: action.response
      };

    case ADD_COURSE:
      return {
        ...state,
        course: action.response
      };

    case GET_COURSE:
      return {
        ...state,
        coursedetails: action.response
      };

    case ADD_TIMETABLE:
      return {
        ...state,
        timetable: action.response
      };

    case GET_TIMETABLE:
      return {
        ...state,
        timetableDetails: action.response
      };

    case ADD_NEWTIMETABLE:
      return {
        ...state,
        ntimetable: action.response
      };

    case GET_NEWTIMETABLE:
      return {
        ...state,
        ntimetableDetails: action.response
      };

    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        announce: action.response
      };

    case GET_ANNOUNCEMENT:
      return {
        ...state,
        announcedetails: action.response
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        cpass: action.response
      };

    case GET_CHANGE_PASSWORD:
      return {
        ...state,
        cpassdetails: action.response
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        fpass: action.response
      };

    case GET_FORGOT_PASSWORD:
      return {
        ...state,
        fpassdetails: action.response
      };

    case ASSIGN_FACULTY:
      console.log('assign Faculty', action);
      return {
        ...state,
        subjectassign: action.response
      };

    case GET_ASSIGN_FACULTY:
      return {
        ...state,
        assignsubject: action.response
      };

    case ADD_QUERY:
      console.log('assign Faculty', action);
      return {
        ...state,
        query: action.response
      };

    case GET_QUERY:
      return {
        ...state,
        querydetails: action.response
      };

    case ATTENDANCE_FACULTY:
      console.log('assign Faculty', action);
      return {
        ...state,
        fattandance: action.response
      };

    case GET_ATTENDANCE_FACULTY:
      return {
        ...state,
        getfattandance: action.response
      };

    case ATTENDANCE_STUDENT:
      console.log('assign Faculty', action);
      return {
        ...state,
        sattandance: action.response
      };

    case GET_ATTENDANCE_STUDENT:
      return {
        ...state,
        getsattandance: action.response
      };

    case STUDENT_SUBJECT:
      return {
        ...state,
        studentSubject: action.response
      };

    case GET_STUDENT_SUBJECT:
      return {
        ...state,
        getStudentSubject: action.response
      };

    case ADD_SUBJECT:
      return {
        ...state,
        subject: action.response
      };

    case GET_SUBJECT:
      return {
        ...state,
        subjectdetails: action.response
      };

    case ADD_STUDENT:
      return {
        ...state,
        student: action.response
      };

    case GET_STUDENT:
      return {
        ...state,
        studentdetails: action.response
      };

    case ADD_FACULTY:
      return {
        ...state,
        faculty: action.response
      };

    case GET_FACULTY:
      return {
        ...state,
        facultydetails: action.response
      };
    default:
      return state;
  }
};

export default cartReducer;
