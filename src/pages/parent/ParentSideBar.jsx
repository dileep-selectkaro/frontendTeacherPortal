import * as React from 'react';
import HomeIcon from "@mui/icons-material/Home";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import MoneyIcon from '@mui/icons-material/Money';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ListItemButtonHomeTemplate, ListItemButtonTemplate } from '../../components/SidebarTemplate';
import { BackupTable, FactCheck, PersonOutline } from '@mui/icons-material';

const ParentSideBar = () => {
    return (
        <React.Fragment>
            <ListItemButtonHomeTemplate
                textProp="Home"
                iconProp={HomeIcon}
                pathProp="/Parent/dashboard"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Student"
                iconProp={PersonOutline}
                pathProp="/Parent/student"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Fees"
                iconProp={MoneyIcon}
                pathProp="/Parent/fees"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Homework"
                iconProp={AssignmentIcon}
                pathProp="/Parent/homework"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Exam Result"
                iconProp={BackupTable}
                pathProp="/Parent/examResult"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Attendance"
                iconProp={FactCheck}
                pathProp="/Parent/attendance"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Notices"
                iconProp={AnnouncementOutlinedIcon}
                pathProp="/SuperAdmin/notices"
                linkProp=""
            />

        </React.Fragment>
    )
}

export default ParentSideBar
