
import React, { useState } from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link, useLocation } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    styled,
    Typography,
} from '@mui/material';

export const ListItemButtonTemplate = ({ textProp, iconProp: IconProp, pathProp, linkProp }) => {
    const location = useLocation();

    return (
        <ListItemButton
            component={Link} to={linkProp === "" ? pathProp : linkProp}
            sx={location.pathname.startsWith(pathProp) ? styles.currentStyle : styles.normalStyle}
        >
            <ListItemIcon>
                <IconProp sx={{ color: location.pathname.startsWith(pathProp) ? '#4d1c9c' : 'inherit' }} />
            </ListItemIcon>
            <ListItemText primary={textProp} />
        </ListItemButton>
    )
}

export const ListItemButtonHomeTemplate = ({ textProp, iconProp: IconProp, pathProp, linkProp }) => {
    const location = useLocation();

    return (
        <ListItemButton
            component={Link} to={linkProp === "" ? pathProp : linkProp}
            sx={(location.pathname === "/" || location.pathname === pathProp) ? styles.currentStyle : styles.normalStyle}
        >
            <ListItemIcon>
                <IconProp sx={{ color: (location.pathname === "/" || location.pathname === pathProp) ? '#4d1c9c' : 'inherit' }} />
            </ListItemIcon>
            <ListItemText primary={textProp} />
        </ListItemButton>
    )
}

export const ListDropdownComponent = ({ textProp, iconProp: IconProp, styleProp, children }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <CustomListItemButton>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={expanded ? <KeyboardArrowUpIcon sx={{ ml: styleProp, mr: styleProp }} /> : <KeyboardArrowLeftIcon sx={{ ml: styleProp, mr: styleProp }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <ListItemIcon>
                        <IconProp />
                    </ListItemIcon>
                    <Typography>{textProp}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </CustomListItemButton>
    );
};

const styles = {
    normalStyle: {
        color: "inherit",
        backgroundColor: "inherit"
    },
    currentStyle: {
        color: "#070477",
        backgroundColor: "#ebebeb"
    },
}

const CustomListItemButton = styled(ListItemButton)({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '& .MuiTouchRipple-root': {
        display: 'none',
    },
    padding: 0
});

const Accordion = styled(MuiAccordion)(() => ({
    boxShadow: "none"
}));

const AccordionSummary = styled(MuiAccordionSummary)(() => ({
    padding: "none"
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: "0px"
}));