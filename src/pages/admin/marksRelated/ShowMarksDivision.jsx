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
import { getMarksDivisionList } from '../../../redux/userRelated/examHandle';

const ShowMarksDivision = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, marksDivisionList, currentToken, loading,
        responseMarksDivisionList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getMarksDivisionList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [marksDivisionID, setMarksDivisionID] = useState("");
    const [marksDivisionName, setMarksDivisionName] = useState("");
    const [percentFrom, setPercentFrom] = useState("")
    const [percentUpto, setPercentUpto] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setMarksDivisionID(row.id)
        setMarksDivisionName(row.marksDivisionName)
        setPercentFrom(row.percentFrom)
        setPercentUpto(row.percentUpto)
    };

    const fields = {
        marksDivisionName,
        percentFrom,
        percentUpto,
    };

    const editHandler = () => {
        if (marksDivisionName === "" || percentFrom === "" || percentUpto === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(marksDivisionID, fields, "marksDivisionUpdate", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setMarksDivisionID(id)
        setDialog("Do you want to delete this Mark Division ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(marksDivisionID, "marksDivisionDelete", currentToken))
    }

    const marksDivisionColumns = [
        { id: 'marksDivisionName', label: 'Division Name', minWidth: 170 },
        { id: 'percentFrom', label: 'Percentage From', minWidth: 170 },
        { id: 'percentUpto', label: 'Percentage Upto', minWidth: 170 },
    ]

    const marksDivisionRows = marksDivisionList.map((marksDivision) => {
        return {
            marksDivisionName: marksDivision?.marksDivisionName,
            percentFrom: marksDivision?.percentFrom,
            percentUpto: marksDivision?.percentUpto,
            id: marksDivision?._id,
        };
    })

    const MarksDivisionButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add Marks Division',
            action: () => navigate(`/Admin/marksDivision/add`)
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getMarksDivisionList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getMarksDivisionList(currentToken))
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
                    {responseMarksDivisionList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate(`/Admin/marksDivision/add`)}>
                                Add Marks Division
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(marksDivisionList) && marksDivisionList.length > 0 &&
                                <TableTemplate buttonHaver={MarksDivisionButtonHaver} columns={marksDivisionColumns} rows={marksDivisionRows} />
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
                    Edit Marks Division
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
                        id="marksDivisionName"
                        label="Division Name"
                        value={marksDivisionName}
                        onChange={(event) => setMarksDivisionName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="percentFrom"
                        label="Percent From"
                        value={percentFrom}
                        onChange={(event) => setPercentFrom(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="percentUpto"
                        label="Percent Upto"
                        value={percentUpto}
                        onChange={(event) => setPercentUpto(event.target.value)}
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

export default ShowMarksDivision;