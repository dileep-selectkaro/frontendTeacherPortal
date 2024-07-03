import {
    Paper, BottomNavigation,
    BottomNavigationAction
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Folder, FolderOutlined } from '@mui/icons-material';
import { setFourSection } from '../../../redux/userRelated/userSlice';
import ShowPurposes from './purposeRelated/ShowPurposes';
import ShowComplaintTypes from './complaintTypeRelated/ShowComplaintTypes';
import ShowSources from './sourceRelated/ShowSources';
import ShowReferences from './referenceRelated/ShowReferences';

const FrontOffice = () => {
    const dispatch = useDispatch();

    const {
        fourSection
    } = useSelector((state) => state.user);

    const handleSectionChange = (event, newSection) => {
        dispatch(setFourSection(newSection));
    };

    return (
        <>
            {fourSection === 'first' && <ShowPurposes />}
            {fourSection === 'second' && <ShowComplaintTypes />}
            {fourSection === 'third' && <ShowSources />}
            {fourSection === 'four' && <ShowReferences />}

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation value={fourSection} onChange={handleSectionChange} showLabels>
                    <BottomNavigationAction
                        label="Purposes"
                        value="first"
                        icon={fourSection === 'first' ? <Folder /> : <FolderOutlined />}
                    />
                    <BottomNavigationAction
                        label="Complaint Types"
                        value="second"
                        icon={fourSection === 'second' ? <Folder /> : <FolderOutlined />}
                    />
                    <BottomNavigationAction
                        label="Sources"
                        value="third"
                        icon={fourSection === 'third' ? <Folder /> : <FolderOutlined />}
                    />
                    <BottomNavigationAction
                        label="References"
                        value="four"
                        icon={fourSection === 'four' ? <Folder /> : <FolderOutlined />}
                    />
                </BottomNavigation>
            </Paper>

        </>
    );
};

export default FrontOffice;