import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Paper, Box, IconButton, Tooltip, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, TextField, DialogActions, Button } from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { Close, DriveFileRenameOutline } from '@mui/icons-material';
import { getExamGroupList } from '../../../redux/userRelated/examHandle';
import { BlueButton, PurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import { BootstrapDialog } from '../../../utils/styles';

const ShowExamGroups = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        examGroupList, currentToken, loading,
        responseExamGroupList, status, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getExamGroupList(currentToken))
    }, [dispatch, currentToken]);

    const [open, setOpen] = useState(false);
    const [examGroupID, setExamGroupID] = useState("");

    const handleClose = () => { setOpen(false) };

    const [examGroupName, setExamGroupName] = useState('')
    const [examType, setExamType] = useState('')
    const [description, setDescription] = useState("");

    const dialogOpener = (row) => {
        setOpen(true);
        setExamGroupID(row.id)
        setExamGroupName(row.examGroupName);
        setExamType(row.examType);
        setDescription(row.description);
    };

    const fields = { examGroupName, examType, description }

    const editHandler = () => {
        if (examGroupName === "" || examType === "" || description === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(examGroupID, fields, "examGroupUpdate", currentToken))
        }
    };

    const examGroupColumns = [
        { id: 'examGroupName', label: 'Name', minWidth: 170 },
        { id: 'examType', label: 'Exam Type', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 170 },
    ]

    const examGroupRows = examGroupList.map((examGroup) => {
        return {
            examType: examGroup?.examType,
            examGroupName: examGroup?.examGroupName,
            description: examGroup?.description,
            id: examGroup?._id,
        };
    })

    const ExamGroupsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/examGroups/exams/${row.id}`)}>
                    Add Exam
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Exam Group',
            action: () => navigate(`/Admin/examGroups/add`)
        },
    ];


    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getExamGroupList(currentToken))
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
                    {responseExamGroupList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton onClick={() => navigate("/Admin/examGroups/add")}>
                                Add Exam Group
                            </PurpleButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(examGroupList) && examGroupList.length > 0 &&
                                <TableTemplate buttonHaver={ExamGroupsButtonHaver} columns={examGroupColumns} rows={examGroupRows} />
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
                    Edit Exam Group
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
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            label="Name"
                            margin='normal'
                            variant="outlined"
                            value={examGroupName}
                            onChange={(e) => setExamGroupName(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            label='Exam Type'
                            name="examType"
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                        >
                            <MenuItem value='General Purpose (Pass/Fail)'>General Purpose (Pass/Fail)</MenuItem>
                            <MenuItem value='School Based Grading System'>School Based Grading System</MenuItem>
                            <MenuItem value='College Based Grading System'>College Based Grading System</MenuItem>
                            <MenuItem value='GPA Grading System'>GPA Grading System</MenuItem>
                            <MenuItem value='Average Passing'>Average Passing</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            rows={4}
                            multiline
                            margin='normal'
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default ShowExamGroups;