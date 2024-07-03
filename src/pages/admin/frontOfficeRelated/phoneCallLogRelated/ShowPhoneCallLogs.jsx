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
import TableTemplate from '../../../../components/TableTemplate';
import { GreenButton } from '../../../../components/buttonStyles';
import SpeedDialTemplate from '../../../../components/SpeedDialTemplate';
import { deletingFunction, updatingFunction } from '../../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { Close, DriveFileRenameOutline } from '@mui/icons-material';
import { BootstrapDialog } from '../../../../utils/styles';
import ConfirmDelete from '../../../../components/ConfirmDelete';
import { getPhoneCallLogList } from '../../../../redux/userRelated/frontOfficeHandle';
import { formatDate } from '../../../../utils/helperFunctions';

const ShowPhoneCallLogs = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, phoneCallLogList, currentToken, loading,
        responsePhoneCallLogList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getPhoneCallLogList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [phoneCallLogID, setPhoneCallLogID] = useState("");
    const [providedName, setProvidedName] = useState("");
    const [callType, setCallType] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setPhoneCallLogID(row.id)
        setProvidedName(row.providedName)
        setCallType(row.callType)
    };

    const fields = { providedName, callType }

    const editHandler = () => {
        if (providedName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (callType === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(phoneCallLogID, fields, "updatePhoneCallLog", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setPhoneCallLogID(id)
        setDialog("Do you want to delete this item ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(phoneCallLogID, "deletePhoneCallLog", currentToken))
    }

    const phoneCallLogColumns = [
        { id: 'providedName', label: 'Name', minWidth: 120 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 },
        { id: 'followUpDate', label: 'Follow Up Date', minWidth: 100 },
        { id: 'callType', label: 'Call Type', minWidth: 100 },
    ];

    const phoneCallLogRows = phoneCallLogList.map((phoneCallLog) => {
        return {
            providedName: phoneCallLog?.providedName,
            callType: phoneCallLog?.callType,
            phone: phoneCallLog?.phone,
            date: phoneCallLog?.date ? formatDate(phoneCallLog?.date) : "",
            followUpDate: phoneCallLog?.followUpDate ? formatDate(phoneCallLog?.followUpDate) : "",
            note: phoneCallLog?.note,
            id: phoneCallLog?._id,
        };
    });

    const PhoneCallLogsButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Phone Call Log',
            action: () => navigate("/Admin/phoneCallLogs/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getPhoneCallLogList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getPhoneCallLogList(currentToken))
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
                    {responsePhoneCallLogList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/phoneCallLogs/add")}>
                                Add Phone Call Logs
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(phoneCallLogList) && phoneCallLogList.length > 0 &&
                                <TableTemplate buttonHaver={PhoneCallLogsButtonHaver} columns={phoneCallLogColumns} rows={phoneCallLogRows} />
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
                    Edit Phone Call Log
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
                        id="providedName"
                        name="providedName"
                        label="Name"
                        value={providedName}
                        onChange={(event) => setProvidedName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="callType"
                        name="callType"
                        label="Meeting With"
                        value={callType}
                        onChange={(event) => setCallType(event.target.value)}
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

export default ShowPhoneCallLogs;