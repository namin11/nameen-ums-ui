import { put, takeEvery } from 'redux-saga/effects';
import * as C from './action/actionType';

const apiUrl = 'http://localhost:3000';
function* userSignUp(action) {
  const data = yield fetch(`${apiUrl}/v1/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: action.requestBody
  }).then((res) => res.json());
  yield put({ type: 'GET_VERFIY_SIGN_DETAILS', response: data });
}
function* updateFromAdminProfile(action) {
  yield fetch(`${apiUrl}/v1/users/edit-user-details`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.updateData
  }).then((res) => res.json());
}
function* updateProfile(action) {
  const data = yield fetch(`${apiUrl}/v1/users/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.updateData
  }).then((res) => res.json());
  yield put({ type: 'GET_VERFIY_SIGN_DETAILS', response: data });
}

function* addedCourse(action) {
  const data = yield fetch(`${apiUrl}/v1/users/create-program`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.courseData
  }).then((res) => res.json());
  yield put({ type: 'GET_COURSE', response: data });
}

function* addedAnnounce(action) {
  const data = yield fetch(`${apiUrl}/v1/users/add-announcement`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.announceData
  }).then((res) => res.json());
  yield put({ type: 'GET_ANNOUNCEMENT', response: data });
}

function* addedTimetable(action) {
  const data = yield fetch(`${apiUrl}/v1/users/upload-exam-time-table`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.timetableData
  }).then((res) => res.json());
  yield put({ type: 'GET_TIMETABLE', response: data });
}

function* addedStudent(action) {
  const data = yield fetch(`${apiUrl}/v1/users/create-student`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.studentData
  }).then((res) => res.json());
  yield put({ type: 'GET_STUDENT', response: data });
}

function* addedFaculty(action) {
  const data = yield fetch(`${apiUrl}/v1/users/create-faculty`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.FacultyData
  }).then((res) => res.json());
  yield put({ type: 'GET_FACULTY', response: data });
}

function* changepassword(action) {
  const data = yield fetch(`${apiUrl}/v1/users/change-password/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.changepass
  }).then((res) => res.json());
  yield put({ type: 'GET_CHANGE_PASSWORD', response: data });
}

function* forgotpassword(action) {
  const data = yield fetch(`${apiUrl}/v1/users/forgot-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: action.forgotpass
  }).then((res) => res.json());
  yield put({ type: 'GET_FORGOT_PASSWORD', response: data });
}

function* addedSubject(action) {
  const data = yield fetch(`${apiUrl}/v1/users/create-course`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.subjectData
  }).then((res) => res.json());
  yield put({ type: 'GET_SUBJECT', response: data });
}

function* assignSubject(action) {
  console.log('assign saga - ', action);
  const data = yield fetch(`${apiUrl}/v1/users/assign-course-faculty`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.assignData
  }).then((res) => res.json());
  console.log('assign afetr saga', data);
  yield put({ type: 'GET_ASSIGN_FACULTY', response: data });
}

function* facultyAttandance(action) {
  console.log('assign saga - ', action);
  const data = yield fetch(`${apiUrl}/v1/users/add-faculty-attendance`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.attendanceData
  }).then((res) => res.json());
  console.log('assign afetr saga', data);
  yield put({ type: 'GET_ATTENDANCE_FACULTY', response: data });
}

function* studentAttandance(action) {
  console.log('assign saga - ', action);
  const data = yield fetch(`${apiUrl}/v1/users/add-student-attendance`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.attendanceData
  }).then((res) => res.json());
  console.log('assign afetr saga', data);
  yield put({ type: 'GET_ATTENDANCE_STUDENT', response: data });
}

function* addstudentSubject(action) {
  console.log('assign saga - ', action);
  const data = yield fetch(`${apiUrl}/v1/users/select-course`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.studentData
  }).then((res) => res.json());
  console.log('assign afetr saga', data);
  yield put({ type: 'GET_STUDENT_SUBJECT', response: data });
}

function* addedQuery(action) {
  console.log('assign saga - ', action);
  const data = yield fetch(`${apiUrl}/v1/users/contact-us`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.queryData
  }).then((res) => res.json());
  console.log('assign afetr saga', data);
  yield put({ type: 'GET_QUERY', response: data });
}

function* addedSeating(action) {
  console.log('assign saga - ', action);
  const data = yield fetch(`${apiUrl}/v1/users/add-examSeating`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Tokens'),
    },
    body: action.seatingData
  }).then((res) => res.json());
  console.log('assign afetr saga', data);
  yield put({ type: 'GET_SEATING', response: data });
}

export default function* rootSaga() {
  yield takeEvery(C.GET_USER_DATA, userSignUp);
  yield takeEvery(C.UPDATE_PROFILE_DATA, updateProfile);
  yield takeEvery(C.UPDATE_PROFILE_DATA_ADMIN, updateFromAdminProfile);
  yield takeEvery(C.ADD_COURSE, addedCourse);
  yield takeEvery(C.ADD_ANNOUNCEMENT, addedAnnounce);
  yield takeEvery(C.ADD_SEATING, addedSeating);
  yield takeEvery(C.ADD_TIMETABLE, addedTimetable);
  yield takeEvery(C.ADD_STUDENT, addedStudent);
  yield takeEvery(C.ADD_FACULTY, addedFaculty);
  yield takeEvery(C.ADD_SUBJECT, addedSubject);
  yield takeEvery(C.ASSIGN_FACULTY, assignSubject);
  yield takeEvery(C.ATTENDANCE_FACULTY, facultyAttandance);
  yield takeEvery(C.ATTENDANCE_STUDENT, studentAttandance);
  yield takeEvery(C.STUDENT_SUBJECT, addstudentSubject);
  yield takeEvery(C.CHANGE_PASSWORD, changepassword);
  yield takeEvery(C.FORGOT_PASSWORD, forgotpassword);
  yield takeEvery(C.ADD_QUERY, addedQuery);
}
