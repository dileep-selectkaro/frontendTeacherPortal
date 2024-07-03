import { Autocomplete, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSclassList, getSubjectList, getTeacherList } from '../../../redux/userRelated/systemHandle';
import { LightPurpleButton } from '../../../components/buttonStyles';
import { setCurrentDay, setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';

import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { useNavigate } from 'react-router-dom';
import { addingFunction } from '../../../redux/userRelated/userHandle';

const AddClassRoutine = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        sclassList, currentToken, status, error,
        response, weekdays, currentDay,
        teacherList, subjectList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
        dispatch(getTeacherList(currentToken, "allTeacherList"));
        dispatch(getSubjectList(currentToken))
    }, [currentToken, dispatch]);

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const [formData, setFormData] = useState([{
        sessionStartTime: "",
        sessionEndTime: "",
        sessionType: "Class",
        sessionSubject: null,
        sessionTeacher: null,
        sessionRoom: "",
    }])

    const sessionStartTimeHandleChange = (index) => (event) => {
        const newFormData = [...formData];
        const formattedTime = event ? event.$d : null;
        newFormData[index].sessionStartTime = formattedTime;
        setFormData(newFormData);
    };

    const sessionEndTimeHandleChange = (index) => (event) => {
        const newFormData = [...formData];
        const formattedTime = event ? event.$d : null;
        newFormData[index].sessionEndTime = formattedTime;
        setFormData(newFormData);
    };

    const sessionTypeHandleChange = (index) => (event) => {
        const newFormData = [...formData];
        if (event.target.value === "Class") {
            newFormData[index].sessionType = event.target.value;
            setFormData(newFormData);
        }
        else if (event.target.value === "Lab") {
            newFormData[index].sessionType = event.target.value;
            setFormData(newFormData);
        }
        else if (event.target.value === "Sports") {
            newFormData[index].sessionType = event.target.value;
            newFormData[index].sessionSubject = null;
            newFormData[index].sessionRoom = "";
            setFormData(newFormData);
        }
        else if (event.target.value === "Interval") {
            newFormData[index].sessionType = event.target.value;
            newFormData[index].sessionSubject = null;
            newFormData[index].sessionTeacher = null;
            newFormData[index].sessionRoom = "";
            setFormData(newFormData);
        }
    };

    const sessionSubjectHandleChange = (index) => (event, newValue) => {
        const newFormData = [...formData];
        newFormData[index].sessionSubject = newValue?._id || null;
        setFormData(newFormData);
    };

    const sessionTeacherHandleChange = (index) => (event, newValue) => {
        const newFormData = [...formData];
        newFormData[index].sessionTeacher = newValue?._id || null;
        setFormData(newFormData);
    };

    const handleSessionRoomChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].sessionRoom = event.target.value;
        setFormData(newFormData);
    };

    const handleAddSession = () => {
        setFormData([...formData, {
            sessionStartTime: "",
            sessionEndTime: "",
            sessionType: "Class",
            sessionSubject: null,
            sessionTeacher: null,
            sessionRoom: "",
        }]);
    };

    const handleRemoveSession = (index) => () => {
        const newFormData = [...formData];
        newFormData.splice(index, 1);
        setFormData(newFormData);
    };

    const fields = {
        sclassName: sclassName,
        section: sectionName,
        dayOfWeek: currentDay,
        sessionDetails: formData,
    };

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addingFunction("classRoutineCreate", fields, currentToken));
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
                        Add Class Routine
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={submitHandler}>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={sclassList || []}
                                    getOptionLabel={(option) => (option?.sclassName || '')}
                                    value={sclassList?.find((item) => item?._id === sclassName) || null}
                                    onChange={(event, newValue) => {
                                        setSclassName(newValue?._id || '');
                                        setClassSectionList(newValue?.sections || []);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label="Select Class Name"
                                            required
                                            fullWidth />
                                    )}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={classSectionList || []}
                                    getOptionLabel={(option) => (option?.sectionName || '')}
                                    value={classSectionList?.find((item) => item?._id === sectionName) || null}
                                    onChange={(event, newValue) => {
                                        setSectionName(newValue?._id || '');
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label="Select Section"
                                            required
                                            fullWidth />
                                    )}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    options={weekdays || []}
                                    getOptionLabel={(option) => option.toString()}
                                    value={currentDay || null}
                                    onChange={(event, newValue) => {
                                        dispatch(setCurrentDay(newValue || null));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Week Day" fullWidth />
                                    )}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        {formData.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Session Type</InputLabel>
                                        <Select
                                            label='Session Type'
                                            name="sessionType"
                                            value={item.sessionType}
                                            onChange={sessionTypeHandleChange(index)}
                                        >
                                            <MenuItem value='Class'>Class</MenuItem>
                                            <MenuItem value='Sports'>Sports</MenuItem>
                                            <MenuItem value='Lab'>Lab</MenuItem>
                                            <MenuItem value='Interval'>Interval</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            options={subjectList || []}
                                            getOptionLabel={(option) => (option?.subName || '')}
                                            value={subjectList?.find((data) => data?._id === item.sessionSubject) || null}
                                            onChange={sessionSubjectHandleChange(index)}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Select Subject"
                                                    required={item.sessionType === 'Class' || item.sessionType === 'Lab'}
                                                    disabled={item.sessionType === 'Sports' || item.sessionType === 'Interval'}
                                                    fullWidth
                                                />
                                            )}
                                            disabled={item.sessionType === 'Sports' || item.sessionType === 'Interval'}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                fullWidth
                                                label="Session Start Time"
                                                value={item.sessionStartTime}
                                                onChange={sessionStartTimeHandleChange(index)}
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
                                                label="Session End Time"
                                                value={item.sessionEndTime}
                                                onChange={sessionEndTimeHandleChange(index)}
                                                required
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            options={teacherList || []}
                                            getOptionLabel={(option) => (option?.name || '')}
                                            value={teacherList?.find((data) => data._id === item.sessionTeacher) || null}
                                            onChange={sessionTeacherHandleChange(index)}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Select Teacher"
                                                    required={item.sessionType === 'Class' || item.sessionType === 'Lab' || item.sessionType === 'Sports'}
                                                    disabled={item.sessionType === 'Interval'}
                                                    fullWidth />
                                            )}
                                            disabled={item.sessionType === 'Interval'}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Classroom Name"
                                            variant="outlined"
                                            value={item.sessionRoom}
                                            onChange={handleSessionRoomChange(index)}
                                            required={item.sessionType === 'Class' || item.sessionType === 'Lab'}
                                            disabled={item.sessionType === 'Sports' || item.sessionType === 'Interval'}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        {index === 0 ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleAddSession}
                                            >
                                                Add Session
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveSession(index)}
                                            >
                                                Remove Session
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

export default AddClassRoutine