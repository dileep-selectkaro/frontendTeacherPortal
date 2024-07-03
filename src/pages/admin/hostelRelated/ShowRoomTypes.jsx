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
import { getRoomTypeList } from '../../../redux/userRelated/hostelHandle';

const ShowRoomTypes = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, roomTypeList, currentToken, loading,
        responseRoomTypeList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getRoomTypeList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [roomTypeID, setRoomTypeID] = useState("");
    const [roomTypeName, setRoomTypeName] = useState("");
    const [roomTypeDescription, setRoomTypeDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setRoomTypeID(row.id)
        setRoomTypeName(row.roomTypeName)
        setRoomTypeDescription(row.roomTypeDescription)
    };

    const fields = { roomTypeName, roomTypeDescription }

    const editHandler = () => {
        if (roomTypeName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (roomTypeDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(roomTypeID, fields, "updateRoomType", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setRoomTypeID(id)
        setDialog("Do you want to delete this item category ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(roomTypeID, "deleteRoomType", currentToken))
    }

    const roomTypeColumns = [
        { id: 'roomTypeName', label: 'Room Type', minWidth: 170 },
        { id: 'roomTypeDescription', label: 'Description', minWidth: 170 },
    ]

    const roomTypeRows = Array.isArray(roomTypeList) && roomTypeList.length > 0 && roomTypeList.map((roomType) => {
        return {
            roomTypeName: roomType?.roomTypeName,
            roomTypeDescription: roomType?.roomTypeDescription,
            id: roomType?._id,
        };
    })

    const RoomTypesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Room Type',
            action: () => navigate("/Admin/roomTypes/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getRoomTypeList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getRoomTypeList(currentToken))
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
                    {responseRoomTypeList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/roomTypes/add")}>
                                Add Room Types
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(roomTypeList) && roomTypeList.length > 0 &&
                                <TableTemplate buttonHaver={RoomTypesButtonHaver} columns={roomTypeColumns} rows={roomTypeRows} />
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
                    Edit Room Type
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
                        id="roomTypeName"
                        name="roomTypeName"
                        label="Room Type Name"
                        value={roomTypeName}
                        onChange={(event) => setRoomTypeName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="roomTypeDescription"
                        name="roomTypeDescription"
                        label="Room Type Name"
                        value={roomTypeDescription}
                        onChange={(event) => setRoomTypeDescription(event.target.value)}
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

export default ShowRoomTypes;