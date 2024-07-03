import React, { useEffect, useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginDashboard } from '../redux/userRelated/userHandle';
import { underControl } from '../redux/userRelated/userSlice';

const AccountMenu = ({ menuRole }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        status, currentRole,
        currentUser, rootID, currentToken
    } = useSelector(state => state.user)

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const loginHandler = () => {
        dispatch(loginDashboard(rootID, "loginAsSuperAdmin", currentToken))
    }

    useEffect(() => {
        if (status === 'superAdminLoggedIn' && currentToken !== null && currentRole === "SuperAdmin") {
            navigate('/SuperAdmin/dashboard');
            dispatch(underControl())
        }
    }, [status, currentToken, dispatch, currentRole, navigate]);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: "#8970dc" }}>
                            {String(currentUser.name).charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: styles.styledPaper,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "#8970dc" }}>
                        {String(currentUser.name).charAt(0)}
                    </Avatar>
                    <Link to={`/${menuRole}/profile`}>
                        <Typography variant="h6">{currentUser?.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {currentUser?.schoolName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {currentUser?.school?.schoolName}
                        </Typography>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => navigate("/logout")}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link to="/logout">
                        Logout
                    </Link>
                </MenuItem>
                {currentRole === "AdminRoot" &&
                    <MenuItem onClick={loginHandler}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <Link onClick={loginHandler}>
                            Go Back to Super Admin Dashboard
                        </Link>
                    </MenuItem>
                }
            </Menu>
        </>
    );
}

export default AccountMenu

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
}