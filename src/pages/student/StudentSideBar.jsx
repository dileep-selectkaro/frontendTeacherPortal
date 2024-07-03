import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ListItemButtonHomeTemplate, ListItemButtonTemplate } from '../../components/SidebarTemplate';

const StudentSideBar = () => {
    return (
        <React.Fragment>
            <ListItemButtonHomeTemplate
                textProp="Home"
                iconProp={HomeIcon}
                pathProp="/Student/dashboard"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Subjects"
                iconProp={AssignmentIcon}
                pathProp="/Student/subjects"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Attendance"
                iconProp={ClassOutlinedIcon}
                pathProp="/Student/attendance"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Complain"
                iconProp={AnnouncementOutlinedIcon}
                pathProp="/Student/complain"
                linkProp=""
            />

        </React.Fragment>
    )
}

export default StudentSideBar