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
import { getPurposeList } from '../../../../redux/userRelated/frontOfficeHandle';

const ShowPurposes = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, purposeList, currentToken, loading,
        responsePurposeList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getPurposeList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [purposeID, setPurposeID] = useState("");
    const [purposeName, setPurposeName] = useState("");
    const [purposeDescription, setPurposeDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setPurposeID(row.id)
        setPurposeName(row.purposeName)
        setPurposeDescription(row.purposeDescription)
    };

    const fields = { purposeName, purposeDescription }

    const editHandler = () => {
        if (purposeName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (purposeDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(purposeID, fields, "purposeUpdate", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setPurposeID(id)
        setDialog("Do you want to delete this purpose ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(purposeID, "purposeDelete", currentToken))
    }

    const purposeColumns = [
        { id: 'purposeName', label: 'Purpose Name', minWidth: 170 },
        { id: 'purposeDescription', label: 'Purpose Description', minWidth: 170 },
    ]

    const purposeRows = purposeList.map((purpose) => {
        return {
            purposeName: purpose?.purposeName,
            purposeDescription: purpose?.purposeDescription,
            id: purpose?._id,
        };
    })

    const PurposesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Purpose',
            action: () => navigate("/Admin/frontOffice/purposes/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getPurposeList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getPurposeList(currentToken))
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
                    {responsePurposeList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/frontOffice/purposes/add")}>
                                Add Purposes
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(purposeList) && purposeList.length > 0 &&
                                <TableTemplate buttonHaver={PurposesButtonHaver} columns={purposeColumns} rows={purposeRows} />
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
                    Edit Purpose
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
                        id="purposeName"
                        name="purposeName"
                        label="Purpose Name"
                        value={purposeName}
                        onChange={(event) => setPurposeName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="purposeDescription"
                        name="purposeDescription"
                        label="Purpose Name"
                        value={purposeDescription}
                        onChange={(event) => setPurposeDescription(event.target.value)}
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

export default ShowPurposes;