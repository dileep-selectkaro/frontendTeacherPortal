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
import { getReferenceList } from '../../../../redux/userRelated/frontOfficeHandle';

const ShowReferences = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, referenceList, currentToken, loading,
        responseReferenceList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getReferenceList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [referenceID, setReferenceID] = useState("");
    const [referenceName, setReferenceName] = useState("");
    const [referenceDescription, setReferenceDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setReferenceID(row.id)
        setReferenceName(row.referenceName)
        setReferenceDescription(row.referenceDescription)
    };

    const fields = { referenceName, referenceDescription }

    const editHandler = () => {
        if (referenceName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (referenceDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(referenceID, fields, "referenceUpdate", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setReferenceID(id)
        setDialog("Do you want to delete this reference ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(referenceID, "referenceDelete", currentToken))
    }

    const referenceColumns = [
        { id: 'referenceName', label: 'Reference Name', minWidth: 170 },
        { id: 'referenceDescription', label: 'Reference Description', minWidth: 170 },
    ]

    const referenceRows = referenceList.map((reference) => {
        return {
            referenceName: reference?.referenceName,
            referenceDescription: reference?.referenceDescription,
            id: reference?._id,
        };
    })

    const ReferencesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Reference',
            action: () => navigate("/Admin/frontOffice/references/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getReferenceList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getReferenceList(currentToken))
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
                    {responseReferenceList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/frontOffice/references/add")}>
                                Add References
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(referenceList) && referenceList.length > 0 &&
                                <TableTemplate buttonHaver={ReferencesButtonHaver} columns={referenceColumns} rows={referenceRows} />
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
                    Edit Reference
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
                        id="referenceName"
                        name="referenceName"
                        label="Reference Name"
                        value={referenceName}
                        onChange={(event) => setReferenceName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="referenceDescription"
                        name="referenceDescription"
                        label="Reference Name"
                        value={referenceDescription}
                        onChange={(event) => setReferenceDescription(event.target.value)}
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

export default ShowReferences;