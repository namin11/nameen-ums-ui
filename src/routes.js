import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
// import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import StudentView from 'src/views/Student/StudentView';
import FacultyView from 'src/views/Faculty/FacultyView';
import CourseView from 'src/views/Course/CourseView';
import SubjectView from 'src/views/Subject/SubjectView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/Login';
import NotFoundView from 'src/views/errors/NotFoundView';
import AssignmentReport from 'src/views/Assignment/AssignmentReport';
import RegisterView from 'src/views/ChangePassword';
import SettingsView from 'src/views/settings/SettingsView';
import Attendance from 'src/views/Attendance';
import QueryList from 'src/views/customer/CustomerListView/Results';
import FacultyCourse from 'src/views/Course/CourseView/FacultyCourse';
import StudentSubject from 'src/views/StudentSubject/SubjectView';
import Announcement from 'src/views/announcement/Announcement';
import ExamTimeTable from 'src/views/Exam/TimeTable';
import ForgotPassword from 'src/views/ForgotPassword';
import EditStudentProfile from 'src/views/Student/StudentView/Profile';
import EditFacultyProfile from 'src/views/Faculty/FacultyView/Profile';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'profile', element: <AccountView /> },
      { path: 'query', element: <CustomerListView /> },
      { path: 'student', element: <StudentView /> },
      { path: 'course', element: <CourseView /> },
      { path: 'announce', element: <Announcement /> },
      { path: 'examtimetable', element: <ExamTimeTable /> },
      { path: 'subject', element: <SubjectView />, children: [{ path: 'subject', element: <SubjectView /> }] },
      { path: 'StudentSubject', element: <StudentSubject /> },
      { path: 'faculty', element: <FacultyView /> },
      { path: 'facultycourse', element: <FacultyCourse /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'Assignment', element: <AssignmentReport /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'querylist', element: <QueryList /> },
      { path: 'StudentProfile', element: <EditStudentProfile /> },
      { path: 'FacultyProfile', element: <EditFacultyProfile /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: '/',
    element: '',
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'changepassword', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: 'fpass', element: <ForgotPassword /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
