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
import { getPostalList } from '../../../../redux/userRelated/frontOfficeHandle';
import { formatDate } from '../../../../utils/helperFunctions';

const ShowPostal = ({ postalType }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, postalList, currentToken, loading,
        responsePostalList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getPostalList(currentToken, postalType))
    }, [currentToken, postalType, dispatch]);

    const [open, setOpen] = useState(false);
    const [postalID, setPostalID] = useState("");
    const [toTitle, setToTitle] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setPostalID(row.id)
        setToTitle(row.toTitle)
    };

    const fields = { toTitle }

    const editHandler = () => {
        if (toTitle === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(postalID, fields, "updatePostal", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setPostalID(id)
        setDialog("Do you want to delete this item ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(postalID, "deletePostal", currentToken))
    }

    const postalReceiveColumns = [
        { id: 'fromTitle', label: 'From Title', minWidth: 100 },
        { id: 'refrenceNo', label: 'Refrence No', minWidth: 100 },
        { id: 'toTitle', label: 'To Title', minWidth: 120 },
        { id: 'date', label: 'Date', minWidth: 100 },
    ];

    const postalDispatchColumns = [
        { id: 'toTitle', label: 'To Title', minWidth: 120 },
        { id: 'refrenceNo', label: 'Refrence No', minWidth: 100 },
        { id: 'fromTitle', label: 'From Title', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 },
    ];

    const postalColumns = postalType === "Receive" ? postalReceiveColumns : postalDispatchColumns

    const postalRows = postalList.map((postal) => {
        return {
            toTitle: postal?.toTitle,
            fromTitle: postal?.fromTitle,
            refrenceNo: postal?.refrenceNo,
            date: postal?.date ? formatDate(postal?.date) : "",
            note: postal?.note,
            address: postal?.address,
            id: postal?._id,
        };
    });

    const PostalButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: `Add Postal ${postalType}`,
            action: () => navigate(`/Admin/postal${postalType}/add`)
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getPostalList(currentToken, postalType))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getPostalList(currentToken, postalType))
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
    }, [status, error, response, postalType, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responsePostalList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate(`/Admin/postal${postalType}/add`)}>
                                Add Postal {postalType}
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(postalList) && postalList.length > 0 &&
                                <TableTemplate buttonHaver={PostalButtonHaver} columns={postalColumns} rows={postalRows} />
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
                        id="toTitle"
                        name="toTitle"
                        label="To Title"
                        value={toTitle}
                        onChange={(event) => setToTitle(event.target.value)}
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

export default ShowPostal;