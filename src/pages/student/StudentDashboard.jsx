import StudentSideBar from './StudentSideBar';
import { Navigate, Route } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import DashboardLayout from '../../components/DashboardLayout';

const StudentDashboard = () => {

    const menuRole = "Student"

    return (
        <DashboardLayout
            dashboardTitle={menuRole}
            menuRole={menuRole}
            SidebarComponent={StudentSideBar}
        >
            <Route path="/" element={<StudentHomePage />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Student/dashboard" element={<StudentHomePage />} />
            <Route path="/Student/profile" element={<StudentProfile />} />

            <Route path="/Student/subjects" element={<StudentSubjects />} />
            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
            <Route path="/Student/complain" element={<StudentComplain />} />

            <Route path="/logout" element={<Logout />} />
        </DashboardLayout>
    );
}

export default StudentDashboard