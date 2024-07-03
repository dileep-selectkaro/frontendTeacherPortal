import { Navigate, Route } from 'react-router-dom';
import Logout from '../Logout.js';
import SuperAdminHomePage from './SuperAdminHomePage.js';
import SuperAdminSideBar from './SuperAdminSideBar.jsx';
import ShowSchools from './schoolPage/ShowSchools.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import ViewSchool from './schoolPage/ViewSchool.jsx';
import AdminRegisterPage from './AdminRegisterPage.js';

const SuperAdminDashboard = () => {

    const dashboardTitle = "Super Admin"
    const menuRole = "SuperAdmin"

    return (
        <DashboardLayout
            dashboardTitle={dashboardTitle}
            menuRole={menuRole}
            SidebarComponent={SuperAdminSideBar}
        >
            <Route path="/" element={<SuperAdminHomePage />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/SuperAdmin/dashboard" element={<SuperAdminHomePage />} />
            <Route path="/SuperAdmin/schools" element={<ShowSchools />} />
            <Route path="/SuperAdmin/schools/school/:schoolName/:id" element={<ViewSchool />} />
            <Route path="/SuperAdmin/schools/add" element={<AdminRegisterPage />} />

            <Route path="/logout" element={<Logout />} />
        </DashboardLayout>
    );
}

export default SuperAdminDashboard