import * as React from 'react';
import HomeIcon from "@mui/icons-material/Home";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { ListItemButtonHomeTemplate, ListItemButtonTemplate } from '../../components/SidebarTemplate';

const SuperAdminSideBar = () => {
    return (
        <React.Fragment>
            <ListItemButtonHomeTemplate
                textProp="Home"
                iconProp={HomeIcon}
                pathProp="/SuperAdmin/dashboard"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Schools"
                iconProp={ClassOutlinedIcon}
                pathProp="/SuperAdmin/schools"
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

export default SuperAdminSideBar
