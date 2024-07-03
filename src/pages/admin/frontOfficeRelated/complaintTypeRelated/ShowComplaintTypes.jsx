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
import { getComplaintTypeList } from '../../../../redux/userRelated/frontOfficeHandle';

const ShowComplaintTypes = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, complaintTypeList, currentToken, loading,
        responseComplaintTypeList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getComplaintTypeList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [complaintTypeID, setComplaintTypeID] = useState("");
    const [complaintTypeName, setComplaintTypeName] = useState("");
    const [complaintTypeDescription, setComplaintTypeDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setComplaintTypeID(row.id)
        setComplaintTypeName(row.complaintTypeName)
        setComplaintTypeDescription(row.complaintTypeDescription)
    };

    const fields = { complaintTypeName, complaintTypeDescription }

    const editHandler = () => {
        if (complaintTypeName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (complaintTypeDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(complaintTypeID, fields, "complaintTypeUpdate", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setComplaintTypeID(id)
        setDialog("Do you want to delete this complaintType ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(complaintTypeID, "complaintTypeDelete", currentToken))
    }

    const complaintTypeColumns = [
        { id: 'complaintTypeName', label: 'Complaint Type Name', minWidth: 170 },
        { id: 'complaintTypeDescription', label: 'Complaint Type Description', minWidth: 170 },
    ]

    const complaintTypeRows = complaintTypeList.map((complaintType) => {
        return {
            complaintTypeName: complaintType?.complaintTypeName,
            complaintTypeDescription: complaintType?.complaintTypeDescription,
            id: complaintType?._id,
        };
    })

    const ComplaintTypesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New ComplaintType',
            action: () => navigate("/Admin/frontOffice/complaintTypes/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getComplaintTypeList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getComplaintTypeList(currentToken))
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
                    {responseComplaintTypeList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/frontOffice/complaintTypes/add")}>
                                Add Complaint Types
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(complaintTypeList) && complaintTypeList.length > 0 &&
                                <TableTemplate buttonHaver={ComplaintTypesButtonHaver} columns={complaintTypeColumns} rows={complaintTypeRows} />
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
                    Edit Complaint Type
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
                        id="complaintTypeName"
                        name="complaintTypeName"
                        label="Complaint Type Name"
                        value={complaintTypeName}
                        onChange={(event) => setComplaintTypeName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="complaintTypeDescription"
                        name="complaintTypeDescription"
                        label="Complaint Type Name"
                        value={complaintTypeDescription}
                        onChange={(event) => setComplaintTypeDescription(event.target.value)}
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

export default ShowComplaintTypes;