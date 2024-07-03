import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { ListItemButtonHomeTemplate, ListItemButtonTemplate } from '../../components/SidebarTemplate';
import { AccessTimeFilled } from '@mui/icons-material';

const TeacherSideBar = () => {
    return (
        <React.Fragment>
            <ListItemButtonHomeTemplate
                textProp="Home"
                iconProp={HomeIcon}
                pathProp="/Teacher/dashboard"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Class Routine"
                iconProp={AccessTimeFilled}
                pathProp="/Teacher/classRoutine"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Classes"
                iconProp={ClassOutlinedIcon}
                pathProp="/Teacher/classes"
                linkProp=""
            />

            <ListItemButtonTemplate
                textProp="Complain"
                iconProp={AnnouncementOutlinedIcon}
                pathProp="/Teacher/complain"
                linkProp=""
            />

        </React.Fragment>
    )
}

export default TeacherSideBar