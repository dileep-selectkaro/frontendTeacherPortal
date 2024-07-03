import { Navigate, Route } from 'react-router-dom';
import Logout from '../Logout.js';
import ParentHomePage from './ParentHomePage.js';
import ParentSideBar from './ParentSideBar.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import ParentShowFees from './ParentShowFees.jsx';
import ParentShowHomework from './ParentShowHomework.jsx';
import ParentShowNotices from './ParentShowNotices.jsx';
import ParentShowExamResult from './ParentShowExamResult.jsx';
import ParentShowAttendance from './ParentShowAttendance.jsx';
import ParentViewStudent from './ParentViewStudent.jsx';

const ParentDashboard = () => {

    const menuRole = "Parent"

    return (
        <DashboardLayout
            dashboardTitle={menuRole}
            menuRole={menuRole}
            SidebarComponent={ParentSideBar}
        >
            <Route path="/" element={<ParentHomePage />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Parent/dashboard" element={<ParentHomePage />} />
            <Route path="/Parent/student" element={<ParentViewStudent />} />
            <Route path="/Parent/fees" element={<ParentShowFees />} />
            <Route path="/Parent/homework" element={<ParentShowHomework />} />
            <Route path="/Parent/examResult" element={<ParentShowExamResult />} />
            <Route path="/Parent/attendance" element={<ParentShowAttendance />} />
            <Route path="/Parent/notices" element={<ParentShowNotices />} />

            <Route path="/logout" element={<Logout />} />
        </DashboardLayout>
    );
}

export default ParentDashboard