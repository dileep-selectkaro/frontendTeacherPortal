import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route } from 'react-router-dom';
import Logout from '../Logout'
import TeacherHomePage from './TeacherHomePage';
import DashboardLayout from '../../components/DashboardLayout';
import TeacherRoutine from './TeacherRoutine';

// import StudentAttendance from '../admin/studentRelated/StudentAttendance';
// import TeacherClassDetails from './TeacherClassDetails';
// import TeacherComplain from './TeacherComplain';
// import TeacherProfile from './TeacherProfile';
// import TeacherViewStudent from './TeacherViewStudent';
// import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {

    const menuRole = "Teacher"

    return (
        <DashboardLayout
            dashboardTitle={menuRole}
            menuRole={menuRole}
            SidebarComponent={TeacherSideBar}
        >
            <Route path="/" element={<TeacherHomePage />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />

            <Route path="/Teacher/classRoutine" element={<TeacherRoutine />} />

            {/* <Route path="/Teacher/profile" element={<TeacherProfile />} />

            <Route path="/Teacher/complain" element={<TeacherComplain />} />

            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
            <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />

            <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
            <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} /> */}

            <Route path="/logout" element={<Logout />} />
        </DashboardLayout>
    );
}

export default TeacherDashboard