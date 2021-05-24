import * as C from './actionType';

export const addSeatingdata = (seatingData) => {
  return {
    type: C.ADD_SEATING,
    seatingData
  };
};
export const storeSeatingdata = (storeData) => {
  return {
    type: C.GET_SEATING,
    storeData
  };
};
export const storeUserData = (requestBody) => {
  return {
    type: C.GET_USER_DATA,
    requestBody
  };
};

export const resetStore = () => {
  return {
    type: C.RESET_STORE
  };
};

export const updateProfileData = (updateData) => {
  return {
    type: C.UPDATE_PROFILE_DATA,
    updateData
  };
};

export const updateProfileDataAdmin = (updateData) => {
  return {
    type: C.UPDATE_PROFILE_DATA_ADMIN,
    updateData
  };
};

export const addCourse = (courseData) => {
  return {
    type: C.ADD_COURSE,
    courseData
  };
};

export const addAnnounce = (announceData) => {
  return {
    type: C.ADD_ANNOUNCEMENT,
    announceData
  };
};

export const addTimetable = (timetableData) => {
  return {
    type: C.ADD_TIMETABLE,
    timetableData
  };
};

export const addNewTimetable = (timetableData) => {
  return {
    type: C.ADD_NEWTIMETABLE,
    timetableData
  };
};

export const assignFaculty = (assignData) => {
  console.log('assign action', assignData);
  return {
    type: C.ASSIGN_FACULTY,
    assignData
  };
};

export const addquery = (queryData) => {
  return {
    type: C.ADD_QUERY,
    queryData
  };
};

export const changepassword = (changepass) => {
  return {
    type: C.CHANGE_PASSWORD,
    changepass
  };
};

export const forgotPassword = (forgotpass) => {
  return {
    type: C.FORGOT_PASSWORD,
    forgotpass
  };
};

export const attendanceFaculty = (attendanceData) => {
  console.log('assign action', attendanceData);
  return {
    type: C.ATTENDANCE_FACULTY,
    attendanceData
  };
};

export const attendanceStudent = (attendanceData) => {
  console.log('assign action', attendanceData);
  return {
    type: C.ATTENDANCE_STUDENT,
    attendanceData
  };
};

export const studentSubject = (studentData) => {
  return {
    type: C.STUDENT_SUBJECT,
    studentData
  };
};

export const addSubject = (subjectData) => {
  return {
    type: C.ADD_SUBJECT,
    subjectData
  };
};

export const addStudent = (studentData) => {
  return {
    type: C.ADD_STUDENT,
    studentData
  };
};

export const addFaculty = (FacultyData) => {
  console.log('FacultyData', FacultyData);
  return {
    type: C.ADD_FACULTY,
    FacultyData
  };
};
