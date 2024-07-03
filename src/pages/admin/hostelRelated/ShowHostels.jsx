import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip,
    DialogTitle, DialogContent, TextField,
    DialogActions, Button
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { deletingFunction, updatingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { Close, DriveFileRenameOutline } from '@mui/icons-material';
import { BootstrapDialog } from '../../../utils/styles';
import ConfirmDelete from '../../../components/ConfirmDelete';
import { getHostelList } from '../../../redux/userRelated/hostelHandle.js';

const ShowHostels = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, hostelList, currentToken, loading,
        responseHostelList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getHostelList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [hostelID, setHostelID] = useState("");
    const [hostelName, setHostelName] = useState("");
    const [hostelType, setHostelType] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setHostelID(row.id)
        setHostelName(row.hostelName)
        setHostelType(row.hostelType)
    };

    const fields = { hostelName, hostelType }

    const editHandler = () => {
        if (hostelName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (hostelType === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(hostelID, fields, "updateHostel", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setHostelID(id)
        setDialog("Do you want to delete this hostel ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(hostelID, "deleteHostel", currentToken))
    }

    const hostelColumns = [
        { id: 'hostelName', label: 'Hostel Name', minWidth: 120 },
        { id: 'hostelType', label: 'Hostel Unit', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 100 },
        { id: 'intake', label: 'Intake', minWidth: 100 },
    ];

    const hostelRows = hostelList.map((hostel) => {
        return {
            hostelName: hostel?.hostelName,
            hostelType: hostel?.hostelType,
            address: hostel?.address,
            intake: hostel?.intake,
            id: hostel?._id,
        };
    });

    const HostelsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deletePopupOpener(row.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Hostel',
            action: () => navigate("/Admin/hostels/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getHostelList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getHostelList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            setOpen(false);
            dispatch(setPopupMessage(response))
            dispatch(underControl())
        }
        else if (status === 'error') {
            setOpen(false);
            dispatch(setPopupMessage("Network Error"))
            dispatch(underControl())
        }
    }, [status, error, response, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseHostelList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/hostels/add")}>
                                Add Hostels
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(hostelList) && hostelList.length > 0 &&
                                <TableTemplate buttonHaver={HostelsButtonHaver} columns={hostelColumns} rows={hostelRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <BootstrapDialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Hostel
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hostelName"
                        name="hostelName"
                        label="Hostel Name"
                        value={hostelName}
                        onChange={(event) => setHostelName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hostelType"
                        name="hostelType"
                        label="Hostel Unit"
                        value={hostelType}
                        onChange={(event) => setHostelType(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editHandler}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <ConfirmDelete
                dialog={dialog}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                deleteHandler={deleteHandler}
            />
        </>
    );
};

export default ShowHostels;