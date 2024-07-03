import React from 'react'
import { Transition } from '../utils/styles';
import { AppBar, CardContent, Dialog, IconButton, Toolbar } from '@mui/material';
import { Close } from '@mui/icons-material';

const FullEditTemplate = ({ open, setOpen, children }) => {

    const handleClose = () => { setOpen(false) };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: "#4d1c9c" }}>
                <Toolbar sx={{ justifyContent: "flex-end" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <CardContent>
                {children}
            </CardContent>
        </Dialog>
    )
}

export default FullEditTemplate