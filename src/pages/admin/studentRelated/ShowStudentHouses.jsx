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
import { getStudentHouseList } from '../../../redux/userRelated/systemHandle';

const ShowStudentHouses = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, studentHouseList, currentToken, loading,
        responseStudentHouseList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getStudentHouseList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [studentHouseID, setStudentHouseID] = useState("");
    const [studentHouseName, setStudentHouseName] = useState("");
    const [studentHouseDescription, setStudentHouseDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setStudentHouseID(row.id)
        setStudentHouseName(row.studentHouseName)
        setStudentHouseDescription(row.studentHouseDescription)
    };

    const fields = { studentHouseName, studentHouseDescription }

    const editHandler = () => {
        if (studentHouseName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (studentHouseDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(studentHouseID, fields, "updateStudentHouse", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setStudentHouseID(id)
        setDialog("Do you want to delete this item category ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(studentHouseID, "deleteStudentHouse", currentToken))
    }

    const studentHouseColumns = [
        { id: 'studentHouseName', label: 'House Name', minWidth: 170 },
        { id: 'studentHouseDescription', label: 'Description', minWidth: 170 },
        { id: 'studentHouseId', label: 'House ID', minWidth: 170 },
    ]

    const studentHouseRows = Array.isArray(studentHouseList) && studentHouseList.length > 0 && studentHouseList.map((studentHouse) => {
        return {
            studentHouseId: studentHouse?.studentHouseId,
            studentHouseName: studentHouse?.studentHouseName,
            studentHouseDescription: studentHouse?.studentHouseDescription,
            id: studentHouse?._id,
        };
    })

    const StudentHousesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New House',
            action: () => navigate("/Admin/studentHouses/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getStudentHouseList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getStudentHouseList(currentToken))
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
                    {responseStudentHouseList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/studentHouses/add")}>
                                Add Houses
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(studentHouseList) && studentHouseList.length > 0 &&
                                <TableTemplate buttonHaver={StudentHousesButtonHaver} columns={studentHouseColumns} rows={studentHouseRows} />
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
                    Edit House
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
                        id="studentHouseName"
                        name="studentHouseName"
                        label="House Name"
                        value={studentHouseName}
                        onChange={(event) => setStudentHouseName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="studentHouseDescription"
                        name="studentHouseDescription"
                        label="House Description"
                        value={studentHouseDescription}
                        onChange={(event) => setStudentHouseDescription(event.target.value)}
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

export default ShowStudentHouses;