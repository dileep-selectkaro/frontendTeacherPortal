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
import { getVisitorList } from '../../../../redux/userRelated/frontOfficeHandle';
import { formatDate, formatFullTime } from '../../../../utils/helperFunctions';

const ShowVisitors = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, visitorList, currentToken, loading,
        responseVisitorList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getVisitorList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [visitorID, setVisitorID] = useState("");
    const [visitorName, setVisitorName] = useState("");
    const [meetingWith, setMeetingWith] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setVisitorID(row.id)
        setVisitorName(row.visitorName)
        setMeetingWith(row.meetingWith)
    };

    const fields = { visitorName, meetingWith }

    const editHandler = () => {
        if (visitorName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (meetingWith === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(visitorID, fields, "updateVisitor", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setVisitorID(id)
        setDialog("Do you want to delete this visitor ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(visitorID, "deleteVisitor", currentToken))
    }

    const visitorColumns = [
        { id: 'visitorName', label: 'Visitor Name', minWidth: 120 },
        { id: 'meetingWith', label: 'Meeting With', minWidth: 100 },
        { id: 'purposeName', label: 'Purpose', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'idCard', label: 'ID Card', minWidth: 100 },
        { id: 'numberOfPerson', label: 'Number of Persons', minWidth: 60 },
        { id: 'date', label: 'Date', minWidth: 100 },
        { id: 'inTime', label: 'In Time', minWidth: 100 },
        { id: 'outTime', label: 'Out Time', minWidth: 100 },
    ];

    const visitorRows = visitorList.map((visitor) => {
        return {
            visitorName: visitor?.visitorName,
            meetingWith: visitor?.meetingWith,
            purposeName: visitor?.purpose?.purposeName,
            purposeID: visitor?.purpose?._id,
            phone: visitor?.phone,
            idCard: visitor?.idCard,
            numberOfPerson: visitor?.numberOfPerson,
            date: visitor?.date ? formatDate(visitor?.date) : "",
            inTime: formatFullTime(new Date(visitor?.inTime)),
            outTime: formatFullTime(new Date(visitor?.outTime)),
            note: visitor?.note,
            id: visitor?._id,
        };
    });

    const VisitorsButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Visitor',
            action: () => navigate("/Admin/visitors/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getVisitorList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getVisitorList(currentToken))
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
                    {responseVisitorList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/visitors/add")}>
                                Add Visitors
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(visitorList) && visitorList.length > 0 &&
                                <TableTemplate buttonHaver={VisitorsButtonHaver} columns={visitorColumns} rows={visitorRows} />
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
                    Edit Visitor
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
                        id="visitorName"
                        name="visitorName"
                        label="Visitor Name"
                        value={visitorName}
                        onChange={(event) => setVisitorName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="meetingWith"
                        name="meetingWith"
                        label="Meeting With"
                        value={meetingWith}
                        onChange={(event) => setMeetingWith(event.target.value)}
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

export default ShowVisitors;