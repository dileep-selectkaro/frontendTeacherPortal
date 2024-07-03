import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip, 
    DialogTitle, DialogContent, TextField, 
    DialogActions, Button, FormControl, Autocomplete,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { deleteUser, updatingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { Close, DriveFileRenameOutline } from '@mui/icons-material';
import { BootstrapDialog } from '../../../utils/styles';
import { getSubjectList } from '../../../redux/userRelated/systemHandle';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, subjectList, currentToken, loading,
        responseSubjectList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentToken))
    }, [currentToken, dispatch]);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
    }

    const [formData, setFormData] = useState({
        subName: '',
        subCode: '',
        subType: '',
    });

    const [open, setOpen] = useState(false);
    const [subjectID, setSubjectID] = useState("");

    const handleClose = () => { setOpen(false) };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const dialogOpener = (row) => {
        setOpen(true);
        setSubjectID(row.id)
        setFormData({
            subName: row.subName,
            subCode: row.subCode,
            subType: row.subType,
        });
    };

    const editHandler = () => {
        if (formData.subName === "" || formData.subCode === "" || formData.subType === null) {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(subjectID, formData, "subjectUpdate", currentToken))
        }
    };

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'subCode', label: 'Subject Code', minWidth: 170 },
        { id: 'subType', label: 'Subject Type', minWidth: 170 },
    ]

    const subjectRows = subjectList.map((subject) => {
        return {
            subName: subject?.subName,
            subCode: subject?.subCode,
            subType: subject?.subType,
            id: subject?._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/subjects/subject/${row.id}`)}>
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate(`/Admin/subjects/add`)
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getSubjectList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            dispatch(getSubjectList(currentToken))
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
                    {responseSubjectList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate(`/Admin/subjects/add`)}>
                                Add Subjects
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(subjectList) && subjectList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
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
                    Edit Subject
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
                        id="subName"
                        name="subName"
                        label="Subject Name"
                        value={formData.subName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="subCode"
                        name="subCode"
                        label="Subject Code"
                        value={formData.subCode}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        variant="standard"
                    />
                    <FormControl fullWidth>
                        <Autocomplete
                            fullWidth
                            margin="dense"
                            id="subType"
                            name="subType"
                            value={formData.subType}
                            onChange={(event, newValue) =>
                                handleInputChange({ target: { name: 'subType', value: newValue } })
                            }
                            options={['Theory', 'Practical']}
                            renderInput={(params) => <TextField {...params} variant="standard" required label="Subject Type" />}
                            required
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editHandler}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default ShowSubjects;