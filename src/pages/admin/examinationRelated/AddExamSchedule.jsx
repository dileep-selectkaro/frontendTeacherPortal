import {
    Autocomplete, Box, Button, Container, FormControl, Grid,
    TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LightPurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';

import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { useNavigate } from 'react-router-dom';
import { addingFunction } from '../../../redux/userRelated/userHandle';
import { getExamGroupList, getExaminationList } from '../../../redux/userRelated/examHandle';
import { getSubjectList } from '../../../redux/userRelated/systemHandle';

const AddExamSchedule = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        examGroupList, currentToken, status, error, response,
        subjectList, currentDate, examinationList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getExamGroupList(currentToken))
        dispatch(getSubjectList(currentToken))
    }, [currentToken, dispatch]);

    const [examGroup, setExamGroup] = useState('')
    const [examinationType, setExaminationType] = useState('')

    useEffect(() => {
        if (examGroup) {
            dispatch(getExaminationList(examGroup, currentToken))
        }
    }, [dispatch, currentToken, examGroup]);

    const showSubjectDetail = (item) => {

        const subName = item?.subName
        const subCode = item?.subCode

        return `${subName} (${subCode})`
    }

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

    const fields = {
        examGroup,
        examinationType,
        examDetails: formData,
    };

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addingFunction("examScheduleCreate", fields, currentToken));
    }

    useEffect(() => {
        if (status === 'added') {
            navigate(-1)
            dispatch(underControl())
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, navigate, dispatch]);

    return (
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 5 }}>
                <Grid item xs={10} sm={8}>
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Add Exam Schedule
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={submitHandler}>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
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
                                            label="Select Exam Group"
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
                                <LightPurpleButton variant='contained' type="submit">
                                    Save
                                </LightPurpleButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Box>
    )
}

export default AddExamSchedule