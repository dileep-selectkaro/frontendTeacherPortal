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
import { getHostelRoomList } from '../../../redux/userRelated/hostelHandle';

const ShowHostelRooms = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, hostelRoomList, currentToken, loading,
        responseHostelRoomList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getHostelRoomList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [itemID, setItemID] = useState("");
    const [hostelRoomName, setHostelRoomName] = useState("");
    const [bedNumber, setBedNumber] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setItemID(row.id)
        setHostelRoomName(row.hostelRoomName)
        setBedNumber(row.bedNumber)
    };

    const fields = { hostelRoomName, bedNumber }

    const editHandler = () => {
        if (hostelRoomName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (bedNumber === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(itemID, fields, "updateHostelRoom", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setItemID(id)
        setDialog("Do you want to delete this item ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(itemID, "deleteHostelRoom", currentToken))
    }

    const itemColumns = [
        { id: 'hostelRoomName', label: 'Room Number / Name', minWidth: 120 },
        { id: 'hostelName', label: 'Hostel', minWidth: 120 },
        { id: 'roomTypeName', label: 'Room Type', minWidth: 120 },
        { id: 'bedNumber', label: 'Bed Number', minWidth: 100 },
        { id: 'costPerBed', label: 'Cost Per Bed', minWidth: 100 },
    ];

    const itemRows = hostelRoomList.map((thing) => {
        return {
            hostelRoomName: thing?.hostelRoomName,
            hostelName: thing?.hostel?.hostelName,
            roomTypeName: thing?.roomType?.roomTypeName,
            bedNumber: thing?.bedNumber,
            costPerBed: thing?.costPerBed,
            id: thing?._id,
        };
    });

    const ItemsButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add Hostel Room',
            action: () => navigate("/Admin/hostelRooms/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getHostelRoomList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getHostelRoomList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            setOpen(false);
            dispatch(setPopupMessage(response))
            setShowDialog(false);
        }
        else if (status === 'error') {
            setOpen(false);
            dispatch(setPopupMessage("Network Error"))
            setShowDialog(false);
        }
    }, [status, error, response, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseHostelRoomList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/hostelRooms/add")}>
                                Add Hostel Room
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(hostelRoomList) && hostelRoomList.length > 0 &&
                                <TableTemplate buttonHaver={ItemsButtonHaver} columns={itemColumns} rows={itemRows} />
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
                    Edit Item
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
                        id="hostelRoomName"
                        name="hostelRoomName"
                        label="Room Number/ Name"
                        value={hostelRoomName}
                        onChange={(event) => setHostelRoomName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bedNumber"
                        name="bedNumber"
                        label="Number of Bed"
                        value={bedNumber}
                        onChange={(event) => setBedNumber(event.target.value)}
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

export default ShowHostelRooms;