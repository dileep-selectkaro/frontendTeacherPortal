import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip,
    FormControl, TextField, RadioGroup,
    FormControlLabel, Radio, Checkbox,
    Autocomplete, Typography, Stack
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { AssignmentInd, BackupTable, CheckBox, DriveFileRenameOutline, IndeterminateCheckBox, Note, TableRows } from '@mui/icons-material';
import { getExaminationList } from '../../../redux/userRelated/examHandle';
import { BlueButton, PurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import FullEditTemplate from '../../../components/FullEditTemplate';

const ShowExaminations = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { examGroup } = useParams()

    const {
        examinationList, currentToken, loading,
        responseExaminationList, sessionYearsList,
        status, error, response, currentSessionYear
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getExaminationList(examGroup, currentToken))
    }, [dispatch, currentToken, examGroup]);

    const [examName, setExamName] = useState('')
    const [sessionYear, setSessionYear] = useState(`${currentSessionYear}`)

    const [publish, setPublish] = useState(false);
    const [publishResult, setPublishResult] = useState(true);
    const [rollNumInfo, setRollNumInfo] = useState("Admit Card Roll No.");

    const [description, setDescription] = useState("");

    const [open, setOpen] = useState(false);
    const [examinationID, setExaminationID] = useState("");

    const dialogOpener = (row) => {
        setOpen(true);
        setExaminationID(row._id)

        setExamName(row.examName);
        setSessionYear(row.sessionYear);
        setPublish(row.publish);
        setPublishResult(row.publishResult);
        setRollNumInfo(row.rollNumInfo);
        setDescription(row.description);
    };

    const fields = {
        examName,
        sessionYear,
        publish,
        publishResult,
        rollNumInfo,
        description,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updatingFunction(examinationID, fields, "examinationUpdate", currentToken))
    };

    const examinationColumns = [
        { id: 'examName', label: 'Name', minWidth: 150 },
        { id: 'sessionYear', label: 'Session', minWidth: 120 },
        { id: 'publish', label: 'Publish Exam', minWidth: 100 },
        { id: 'publishResult', label: 'Publish Result', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 130 },
    ]

    const examinationRows = examinationList.map((examination) => {
        return {
            examName: examination?.examName,
            sessionYear: examination?.sessionYear,
            publish: examination?.publish ? <CheckBox color="primary" /> : <IndeterminateCheckBox color="error" />,
            publishResult: examination?.publishResult ? <CheckBox color="primary" /> : <IndeterminateCheckBox color="error" />,
            description: examination?.description,
            data: examination,
            id: examination?._id,
        };
    })

    const ExaminationsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Assign Students">
                    <IconButton
                        onClick={() =>
                            navigate(`/Admin/examGroups/exams/students/${examGroup}/${row.id}/${row.sessionYear}`)
                        }
                        color="success"
                    >
                        <AssignmentInd color="success" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Exam Subjects">
                    <IconButton
                        onClick={() =>
                            navigate(`/Admin/examGroups/exams/schedule/${examGroup}/${row.id}/${row.sessionYear}`)
                        }
                        color="success"
                    >
                        <Note color="info" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Provide Exam Marks">
                    <IconButton
                        onClick={() =>
                            navigate(`/Admin/examGroups/exams/subjects/${examGroup}/${row.id}/${row.sessionYear}`)
                        }
                        color="secondary"
                    >
                        <BackupTable color="secondary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row.data)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Generate Rank">
                    <IconButton
                        onClick={() =>
                            navigate(`/Admin/examGroups/exams/generateRank/${examGroup}/${row.id}/${row.sessionYear}`)
                        }
                        color="warning"
                    >
                        <TableRows color="warning" />
                    </IconButton >
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Examination',
            action: () => navigate(`/Admin/examGroups/exams/add/${examGroup}`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getExaminationList(examGroup, currentToken))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            setOpen(false);
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            setOpen(false);
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch, examGroup, currentToken]);


    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseExaminationList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton onClick={() => navigate(`/Admin/examGroups/exams/add/${examGroup}`)}>
                                Add Examination
                            </PurpleButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(examinationList) && examinationList.length > 0 &&
                                <TableTemplate buttonHaver={ExaminationsButtonHaver} columns={examinationColumns} rows={examinationRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <FullEditTemplate
                open={open}
                setOpen={setOpen}
            >
                <Box
                    sx={{
                        flex: '1 1 auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 550,
                            px: 3,
                            py: '100px',
                            width: '100%'
                        }}
                    >
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">
                                Edit Examination
                            </Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Exam"
                                        variant="outlined"
                                        value={examName}
                                        onChange={(e) => setExamName(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        options={sessionYearsList || []}
                                        getOptionLabel={(option) => option.toString()}
                                        value={sessionYear || null}
                                        onChange={(event, newValue) => {
                                            setSessionYear(newValue || null);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Session" required fullWidth />
                                        )}
                                        required
                                    />
                                </FormControl>
                                <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                                    <FormControlLabel
                                        label="Publish"
                                        control={
                                            <Checkbox
                                                checked={publish}
                                                onChange={(event) => {
                                                    setPublish(event.target.checked);
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        label="Publish Result"
                                        control={
                                            <Checkbox
                                                checked={publishResult}
                                                onChange={(event) => {
                                                    setPublishResult(event.target.checked);
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-label='rollNumInfo'
                                        name="rollNumInfo"
                                        value={rollNumInfo}
                                        onChange={(e) => setRollNumInfo(e.target.value)}
                                    >
                                        <FormControlLabel value='Admit Card Roll No.' label='Admit Card Roll No.' control={<Radio />} />
                                        <FormControlLabel value='Profile Roll No.' label='Profile Roll No.' control={<Radio />} />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Description"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <BlueButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    type="submit"
                                >
                                    Save Changes
                                </BlueButton>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </FullEditTemplate>
        </>
    );
};

export default ShowExaminations;

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
    },
};