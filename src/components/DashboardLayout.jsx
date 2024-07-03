import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Close, SchoolOutlined } from '@mui/icons-material';
import { Routes, useNavigate } from 'react-router-dom';

import { AppBar, Drawer, NavLogo } from '../utils/styles.js';

import AccountMenu from './AccountMenu.js';

const DashboardLayout = ({ dashboardTitle, menuRole, SidebarComponent, children }) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();

    const homeHandler = () => {
        navigate("/");
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute' sx={{ backgroundColor: "#4d1c9c" }}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Desktop */}

                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: "pointer"
                            }}
                        >
                            <NavLogo
                                to="top"
                                activeClass="active"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={homeHandler}
                            >
                                <SchoolOutlined sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                                {dashboardTitle}
                            </NavLogo>

                        </Typography>

                        {/* Mobile */}

                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <NavLogo
                                to="top"
                                activeClass="active"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={homeHandler}
                            >
                                <SchoolOutlined sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                                {dashboardTitle}
                            </NavLogo>
                        </Typography>

                        <AccountMenu menuRole={menuRole} />
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <Close />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SidebarComponent />
                    </List>
                </Drawer>

                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        {children}
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default DashboardLayout;

const styles = {
    boxStyled: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex",
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}