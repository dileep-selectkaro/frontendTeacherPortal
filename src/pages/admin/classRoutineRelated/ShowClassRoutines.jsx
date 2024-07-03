import React, { useEffect, useState } from 'react'
import { BlueButton, LightPurpleButton, PurpleButton } from '../../../components/buttonStyles'
import { useNavigate } from 'react-router-dom';
import {
    Autocomplete, Box, Button, Card, CardContent,
    Container, FormControl, FormControlLabel,
    Grid, InputLabel, MenuItem, Paper, Select, Switch, Table,
    TableBody, TableContainer, TableHead,
    TextField, Typography
} from '@mui/material';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getClassRoutineList } from '../../../redux/userRelated/classRoutineHandle';
import { KeyboardArrowDown, KeyboardArrowUp, PostAdd } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSclassList, getSubjectList, getTeacherList } from '../../../redux/userRelated/systemHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { formatFullTime, formatNameObj } from '../../../utils/helperFunctions';
import { StyledTableCell, StyledTableRow, TableCellStyled } from '../../../components/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FullEditTemplate from '../../../components/FullEditTemplate';

const ShowClassRoutines = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        currentToken, classRoutineList, sclassList, subjectList, teacherList,
        responseClassRoutineList, weekdays, status, error, response,
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [showEdit, setShowEdit] = useState(false);
    const [openTab, setOpenTab] = useState(false)

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const findSessionsForDay = (dayOfWeek) => {
        return classRoutineList.filter((item) => item.dayOfWeek === dayOfWeek);
    };

    const [classRoutineID, setClassRoutineID] = useState("")
    const [classRoutineDay, setClassRoutineDay] = useState("")

    const [open, setOpen] = useState(false);

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

    const dialogOpener = (row) => {
        dispatch(getSubjectList(currentToken))
        dispatch(getTeacherList(currentToken, "allTeacherList"));
        setOpen(true);
        setClassRoutineID(row?._id)
        setClassRoutineDay(row?.dayOfWeek)

        const updatedSessionDetails = (row?.sessionDetails || []).map((item) => {
            return {
                ...item,
                sessionStartTime: dayjs(item.sessionStartTime),
                sessionEndTime: dayjs(item.sessionEndTime),
            };
        });

        setFormData(updatedSessionDetails);
    }

    const editHandler = () => {
        dispatch(updatingFunction(classRoutineID, formData, "classRoutineUpdate", currentToken))
    };

    const tabOpenHandler = () => {
        if (!sclassName) {
            dispatch(setPopupMessage("Please Select Class First"))
        }
        else if (!sectionName) {
            dispatch(setPopupMessage("Please Select Section First"))
        }
        else {
            dispatch(getClassRoutineList(sclassName, currentToken, sectionName))
            setOpenTab(!openTab)
        }
    }

    const actions = [
        {
            icon: <PostAdd color="primary" />, name: 'Add New Class Routine',
            action: () => navigate(`/Admin/classRoutine/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            dispatch(underControl())
            setOpen(false);
            dispatch(getClassRoutineList(sclassName, currentToken, sectionName))
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch, sclassName, sectionName, currentToken]);

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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                        <BlueButton onClick={() => tabOpenHandler()}>
                            Search {openTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlueButton>
                    </Box>
                </Grid>
            </Grid>
            {openTab &&
                <>
                    {responseClassRoutineList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no time table found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden', mb: 5 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showEdit}
                                            onChange={(event) => {
                                                setShowEdit(event.target.checked);
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Show Edit"
                                />
                                {Array.isArray(classRoutineList) && classRoutineList.length > 0 &&
                                    <TableContainer component={Paper}>
                                        <Table aria-label="class routine table">
                                            <TableHead>
                                                <StyledTableRow>
                                                    {weekdays.map((day) => (
                                                        <StyledTableCell key={day}>{day}</StyledTableCell>
                                                    ))}
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    {weekdays.map((day) => {
                                                        const sessions = findSessionsForDay(day);
                                                        const sessionDetails = sessions[0]?.sessionDetails;
                                                        return (
                                                            <TableCellStyled key={day}>
                                                                {sessionDetails?.length > 0 ? (
                                                                    <div>
                                                                        {sessionDetails?.map((session, index) => (
                                                                            <Card key={index} sx={{ mb: 2 }}>
                                                                                <CardContent>
                                                                                    <Typography variant="body2" sx={{ color: "green" }}>
                                                                                        <LibraryBooksIcon sx={{ fontSize: "12px", mr: "5px" }} />
                                                                                        Subject: {session?.sessionSubject?.subName} ({session?.sessionSubject?.subCode})
                                                                                    </Typography>
                                                                                    <Typography variant="body2" sx={{ color: "green" }}>
                                                                                        <AccessTimeIcon sx={{ fontSize: "12px", mr: "5px" }} />
                                                                                        {`${formatFullTime(new Date(session?.sessionStartTime))} - ${formatFullTime(new Date(session?.sessionEndTime))}`}
                                                                                    </Typography>
                                                                                    <Typography variant="body2" sx={{ color: "green" }}>
                                                                                        <PersonIcon sx={{ fontSize: "12px", mr: "5px" }} />
                                                                                        {`${formatNameObj(session?.sessionTeacher?.teacherName)}`}
                                                                                    </Typography>
                                                                                    <Typography variant="body2" sx={{ color: "green" }}>
                                                                                        <ApartmentIcon sx={{ fontSize: "12px", mr: "5px" }} />
                                                                                        {`Room: ${session?.sessionRoom}`}
                                                                                    </Typography>
                                                                                </CardContent>
                                                                            </Card>
                                                                        ))}

                                                                        {showEdit &&
                                                                            <Box display="flex" justifyContent="center">
                                                                                <PurpleButton onClick={() => dialogOpener(sessions[0])}>
                                                                                    Edit
                                                                                </PurpleButton>
                                                                            </Box>
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <Typography color="error">Not Scheduled</Typography>
                                                                )}
                                                            </TableCellStyled>
                                                        );
                                                    })}
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </Paper>
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
                            Edit Class Routine: {classRoutineDay}
                        </Typography>
                    </Grid>
                </Grid>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
                        {Array.isArray(formData) && formData.map((item, index) => (
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
                                            value={subjectList?.find((data) => data?._id === item.sessionSubject?._id) || subjectList?.find((data) => data?._id === item.sessionSubject) || null}
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
                                            value={teacherList?.find((data) => data._id === item.sessionTeacher?._id) || teacherList?.find((data) => data._id === item.sessionTeacher) || null}
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
                                <LightPurpleButton variant='contained' onClick={editHandler} >
                                    Save Changes
                                </LightPurpleButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </FullEditTemplate>
        </>
    )
}

export default ShowClassRoutines