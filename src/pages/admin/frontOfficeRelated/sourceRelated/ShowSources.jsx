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
import { getSourceList } from '../../../../redux/userRelated/frontOfficeHandle';

const ShowSources = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, sourceList, currentToken, loading,
        responseSourceList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSourceList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [sourceID, setSourceID] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceDescription, setSourceDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setSourceID(row.id)
        setSourceName(row.sourceName)
        setSourceDescription(row.sourceDescription)
    };

    const fields = { sourceName, sourceDescription }

    const editHandler = () => {
        if (sourceName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (sourceDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(sourceID, fields, "sourceUpdate", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setSourceID(id)
        setDialog("Do you want to delete this source ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(sourceID, "sourceDelete", currentToken))
    }

    const sourceColumns = [
        { id: 'sourceName', label: 'Source Name', minWidth: 170 },
        { id: 'sourceDescription', label: 'Source Description', minWidth: 170 },
    ]

    const sourceRows = sourceList.map((source) => {
        return {
            sourceName: source?.sourceName,
            sourceDescription: source?.sourceDescription,
            id: source?._id,
        };
    })

    const SourcesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Source',
            action: () => navigate("/Admin/frontOffice/sources/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getSourceList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getSourceList(currentToken))
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
                    {responseSourceList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/frontOffice/sources/add")}>
                                Add Sources
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(sourceList) && sourceList.length > 0 &&
                                <TableTemplate buttonHaver={SourcesButtonHaver} columns={sourceColumns} rows={sourceRows} />
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
                    Edit Source
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
                        id="sourceName"
                        name="sourceName"
                        label="Source Name"
                        value={sourceName}
                        onChange={(event) => setSourceName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="sourceDescription"
                        name="sourceDescription"
                        label="Source Name"
                        value={sourceDescription}
                        onChange={(event) => setSourceDescription(event.target.value)}
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

export default ShowSources;