import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import ChooseUser from './pages/ChooseUser';
import SuperAdminRegisterPage from './pages/SuperAdminRegisterPage';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';

const App = () => {
  const { currentRole, currentToken } = useSelector(state => state.user);

  return (
    <Router>
      {currentToken === null && currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/SuperAdminlogin" element={<LoginPage role="SuperAdmin" />} />
          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />
          <Route path="/Parentlogin" element={<LoginPage role="Parent" />} />

          <Route path="/SuperAdminregister" element={<SuperAdminRegisterPage />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {currentToken && currentRole === "SuperAdmin" &&
        <>
          <SuperAdminDashboard />
        </>
      }

      {currentToken && (currentRole === "Admin" || currentRole === "AdminRoot") &&
        <>
          <AdminDashboard />
        </>
      }

      {currentToken && currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentToken && currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }

      {currentToken && currentRole === "Parent" &&
        <>
          <ParentDashboard />
        </>
      }
    </Router>
  )
}

export default App