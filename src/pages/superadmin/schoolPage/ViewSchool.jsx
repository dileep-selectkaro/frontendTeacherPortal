import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { CustomTabPanel, StyledTabPanel, a11yProps } from '../../../utils/styles';
import SchoolDetails from './SchoolDetails';
import ShowSchoolStudents from './ShowSchoolStudents';
import ShowSchoolTeachers from './ShowSchoolTeachers';

const ViewSchool = () => {

    const [detailsValue, setDetailsValue] = useState(0);

    const handleChange = (event, newValue) => {
        setDetailsValue(newValue)
    };

    return (
        <>
            <Box sx={{
                width: '100%', typography: 'body1'
            }} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={detailsValue} onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="Students" {...a11yProps(1)} />
                        <Tab label="Teachers" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                    <StyledTabPanel value={detailsValue} index={0}>
                        <SchoolDetails />
                    </StyledTabPanel>
                    <CustomTabPanel value={detailsValue} index={1}>
                        <ShowSchoolStudents />
                    </CustomTabPanel>
                    <CustomTabPanel value={detailsValue} index={2}>
                        <ShowSchoolTeachers />
                    </CustomTabPanel>
                </Container>
            </Box>
        </>
    )
}

export default ViewSchool