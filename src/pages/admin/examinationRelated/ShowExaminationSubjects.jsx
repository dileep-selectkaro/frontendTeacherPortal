import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {
    Paper, Box, IconButton, Tooltip, Typography,
    Grid,
    Container,
    Autocomplete,
    FormControl,
    TextField,
    Button
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { PostAdd, TableView } from '@mui/icons-material';
import { getExamScheduleList } from '../../../redux/userRelated/examHandle';
import { calculateFullDuration, formatDate, formatFullTime } from '../../../utils/helperFunctions';
import TableViewTemplate from '../../../components/TableViewTemplate';
import FullEditTemplate from '../../../components/FullEditTemplate';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LightPurpleButton, PurpleButton } from '../../../components/buttonStyles';
import dayjs from 'dayjs';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { getSubjectList } from '../../../redux/userRelated/systemHandle';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowExaminationSubjects = ({ schedule }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { examGroup, examinationType, sessionYear } = useParams()
    const {
        currentToken, loading, examScheduleList, responseExamScheduleList,
        status, error, response, currentDate, subjectList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getExamScheduleList(examGroup, currentToken, examinationType))
    }, [dispatch, currentToken, examGroup, examinationType]);

    const examScheduleDetails = examScheduleList?.examDetails

    const [formData, setFormData] = useState([{
        examSubject: null,
        examDate: `${currentDate}`,
        examStartTime: "",
        examEndTime: "",
        examRoom: "",
        examMaxMarks: "",
        examMinMarks: "",
    }])

    const examSubjectHandleChange = (index) => (event, newValue) => {
        const newFormData = [...formData];
        newFormData[index].examSubject = newValue?._id || null;
        setFormData(newFormData);
    };

    const handleExamDateChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].examDate = event.target.value;
        setFormData(newFormData);
    };

    const examStartTimeHandleChange = (index) => (event) => {
        const newFormData = [...formData];
        const formattedTime = event ? event.$d : null;
        newFormData[index].examStartTime = formattedTime;
        setFormData(newFormData);
    };

    const examEndTimeHandleChange = (index) => (event) => {
        const newFormData = [...formData];
        const formattedTime = event ? event.$d : null;
        newFormData[index].examEndTime = formattedTime;
        setFormData(newFormData);
    };

    const handleExamRoomChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].examRoom = event.target.value;
        setFormData(newFormData);
    };

    const handleExamMaxMarksChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].examMaxMarks = event.target.value;
        setFormData(newFormData);
    };

    const handleExamMinMarksChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].examMinMarks = event.target.value;
        setFormData(newFormData);
    };

    const handleAddItem = () => {
        setFormData([...formData, {
            examSubject: null,
            examDate: `${currentDate}`,
            examStartTime: "",
            examEndTime: "",
            examRoom: "",
            examMaxMarks: "",
            examMinMarks: "",
        }]);
    };

    const handleRemoveItem = (index) => () => {
        const newFormData = [...formData];
        newFormData.splice(index, 1);
        setFormData(newFormData);
    };

    const [examScheduleID, setExamScheduleID] = useState("")

    const [open, setOpen] = useState(false);

    const dialogOpener = () => {
        dispatch(getSubjectList(currentToken))
        setOpen(true);
        setExamScheduleID(examScheduleList._id)

        const updatedSessionDetails = (examScheduleDetails || []).map((item) => {
            return {
                ...item,
                examSubject: item?.examSubject?._id,
                examDate: formatDate(item?.examDate),
                examStartTime: dayjs(item.examStartTime),
                examEndTime: dayjs(item.examEndTime),
            };
        });

        setFormData(updatedSessionDetails);
    }

    const showSubjectDetail = (item) => {

        const subName = item?.subName
        const subCode = item?.subCode

        return `${subName} (${subCode})`
    }

    const editHandler = () => {
        dispatch(updatingFunction(examScheduleID, formData, "examScheduleUpdate", currentToken))
    }

    const arrayColumns = [
        { id: 'examSubject', label: 'Subject', flex: 1, minWidth: 100 },
        { id: 'examDate', label: 'Date', minWidth: 100 },
        { id: 'examStartTime', label: 'Start Time', flex: 1, minWidth: 100 },
        { id: 'examEndTime', label: 'End Time', flex: 1, minWidth: 100 },
        { id: 'examDuration', label: 'Duration', flex: 1, minWidth: 100 },
        { id: 'examRoom', label: 'Room No.', flex: 1, minWidth: 100 },
        { id: 'examMaxMarks', label: 'Marks (Max..)', flex: 1, minWidth: 100 },
        { id: 'examMinMarks', label: 'Marks (Min..)', flex: 1, minWidth: 100 },
    ]

    const arrayRows = examScheduleDetails?.map((item) => {
        const examDuration = calculateFullDuration(item.examStartTime, item.examEndTime);

        return {
            examSubject: item?.examSubject?.subName,
            examSubjectID: item?.examSubject?._id,
            examDate: formatDate(item?.examDate),
            examStartTime: formatFullTime(new Date(item?.examStartTime)),
            examEndTime: formatFullTime(new Date(item?.examEndTime)),
            examDuration: examDuration,
            examRoom: item?.examRoom,
            examMaxMarks: item?.examMaxMarks,
            examMinMarks: item?.examMinMarks,
            data: item,
            id: item?._id,
        };
    })

    const ArrayButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Enter Exam Marks">
                    <IconButton onClick={() => navigate(`/Admin/examGroups/exams/subjects/students/${examinationType}/${row.examSubject}/${row.examSubjectID}/${sessionYear}`)} color="secondary">
                        <TableView color="secondary" />
                    </IconButton >
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAdd color="primary" />, name: 'Add New Exam Schedule',
            action: () => navigate(`/Admin/examSchedule/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            dispatch(underControl())
            setOpen(false);
            dispatch(getExamScheduleList(examGroup, currentToken, examinationType))
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
            setOpen(false);
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
            setOpen(false);
        }
    }, [status, error, response, dispatch, examGroup, examinationType, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseExamScheduleList ?
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                            <Typography variant="h5" gutterBottom>
                                Sorry no schedule found
                            </Typography>
                            <SpeedDialTemplate actions={actions} />
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(examScheduleDetails) && examScheduleDetails.length > 0 &&
                                    <>
                                        {
                                            schedule ?
                                                <TableViewTemplate
                                                    columns={arrayColumns}
                                                    rows={arrayRows}
                                                />
                                                :
                                                <TableTemplate
                                                    buttonHaver={ArrayButtonHaver}
                                                    columns={arrayColumns}
                                                    rows={arrayRows}
                                                />
                                        }
                                    </>

                                }
                            </Paper>
                            {schedule && Array.isArray(examScheduleDetails) && examScheduleDetails.length > 0 &&
                                <Grid container spacing={7} sx={{ p: 5 }}>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                                            <PurpleButton onClick={() => dialogOpener()}>
                                                Edit Exam Schedule
                                            </PurpleButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    }
                </>
            }


            <FullEditTemplate
                open={open}
                setOpen={setOpen}
            >
                <Grid container spacing={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 5 }}>
                    <Grid item xs={10} sm={8}>
                        <Typography variant="h5" gutterBottom textAlign="center">
                            Edit Exam Routine
                        </Typography>
                    </Grid>
                </Grid>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
                        {formData.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            options={subjectList || []}
                                            getOptionLabel={(option) => (showSubjectDetail(option) || '')}
                                            value={subjectList?.find((data) => data?._id === item.examSubject) || null}
                                            onChange={examSubjectHandleChange(index)}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Select Subject"
                                                    required
                                                    fullWidth
                                                />
                                            )}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Date From"
                                            type='date'
                                            variant="outlined"
                                            value={item.examDate}
                                            onChange={handleExamDateChange(index)}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                fullWidth
                                                label="Start Time"
                                                value={item.examStartTime}
                                                onChange={examStartTimeHandleChange(index)}
                                                required
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                fullWidth
                                                label="End Time"
                                                value={item.examEndTime}
                                                onChange={examEndTimeHandleChange(index)}
                                                required
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Marks (Max..)"
                                            type='number'
                                            variant="outlined"
                                            value={item.examMaxMarks}
                                            onChange={handleExamMaxMarksChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Marks (Min..)"
                                            type='number'
                                            variant="outlined"
                                            value={item.examMinMarks}
                                            onChange={handleExamMinMarksChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Room No."
                                            variant="outlined"
                                            value={item.examRoom}
                                            onChange={handleExamRoomChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        {index === 0 ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleAddItem}
                                            >
                                                Add Item
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveItem(index)}
                                            >
                                                Remove Item
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                                <LightPurpleButton variant='contained' onClick={editHandler} >
                                    Save Changes
                                </LightPurpleButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </FullEditTemplate>
        </>
    );
};

export default ShowExaminationSubjects;