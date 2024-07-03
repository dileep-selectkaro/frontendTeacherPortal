import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, Autocomplete,
    TextField, FormControl, Grid, Typography,
    Button, Container
} from '@mui/material';
import TableViewTemplate from '../../../components/TableViewTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getExamGroupList, getExamScheduleList, getExaminationList } from '../../../redux/userRelated/examHandle';
import { BlueButton, LightPurpleButton, PurpleButton } from '../../../components/buttonStyles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateFullDuration, formatDate, formatFullTime } from '../../../utils/helperFunctions';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import FullEditTemplate from '../../../components/FullEditTemplate';
import { getSubjectList } from '../../../redux/userRelated/systemHandle';

const ShowExamGroups = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        examGroupList, currentToken, examScheduleList, subjectList,
        responseExamScheduleList, examinationList, currentDate,
        status, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getExamGroupList(currentToken))
    }, [dispatch, currentToken]);

    const examScheduleDetails = examScheduleList?.examDetails

    const [openTab, setOpenTab] = useState(false)
    const [examGroup, setExamGroup] = useState('')
    const [examinationType, setExaminationType] = useState('')

    useEffect(() => {
        if (examGroup) {
            dispatch(getExaminationList(examGroup, currentToken))
        }
    }, [dispatch, currentToken, examGroup]);

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

    const tabOpenHandler = () => {
        if (!examGroup) {
            dispatch(setPopupMessage("Please Select Exam Group First"))
        }
        else if (!examinationType) {
            dispatch(setPopupMessage("Please Select Examination First"))
        }
        else {
            dispatch(getExamScheduleList(examGroup, currentToken, examinationType))
            setOpenTab(!openTab)
        }
    }

    const examScheduleColumns = [
        { id: 'examSubject', label: 'Subject', flex: 1, minWidth: 100 },
        { id: 'examDate', label: 'Date', minWidth: 100 },
        { id: 'examStartTime', label: 'Start Time', flex: 1, minWidth: 100 },
        { id: 'examEndTime', label: 'End Time', flex: 1, minWidth: 100 },
        { id: 'examDuration', label: 'Duration', flex: 1, minWidth: 100 },
        { id: 'examRoom', label: 'Room No.', flex: 1, minWidth: 100 },
        { id: 'examMaxMarks', label: 'Marks (Max..)', flex: 1, minWidth: 100 },
        { id: 'examMinMarks', label: 'Marks (Min..)', flex: 1, minWidth: 100 },
    ]

    const examScheduleRows = examScheduleDetails?.map((item) => {
        const examDuration = calculateFullDuration(item.examStartTime, item.examEndTime);

        return {
            examSubject: item?.examSubject?.subName,
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

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Exam Schedule',
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
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Select Criteria
                </Typography>
                <SpeedDialTemplate actions={actions} />
            </Box>
            <Grid container spacing={7} sx={{ p: 5 }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={examGroupList || []}
                            getOptionLabel={(option) => (option?.examGroupName || '')}
                            value={examGroupList?.find((item) => item?._id === examGroup) || null}
                            onChange={(event, newValue) => {
                                setExamGroup(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Exam Group"
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
                        <Autocomplete
                            options={examinationList || []}
                            getOptionLabel={(option) => (option?.examName || '')}
                            value={examinationList?.find((item) => item?._id === examinationType) || null}
                            onChange={(event, newValue) => {
                                setExaminationType(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Examination"
                                    required
                                    fullWidth
                                />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                        <BlueButton onClick={() => tabOpenHandler()}>
                            View Exam Schedule {openTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlueButton>
                    </Box>
                </Grid>
            </Grid>
            {openTab &&
                <>
                    {responseExamScheduleList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no schedule found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(examScheduleDetails) && examScheduleDetails.length > 0 &&
                                    <TableViewTemplate columns={examScheduleColumns} rows={examScheduleRows} />
                                }
                            </Paper>

                        </>
                    }
                </>
            }
            {openTab && Array.isArray(examScheduleDetails) && examScheduleDetails.length > 0 &&
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

export default ShowExamGroups;