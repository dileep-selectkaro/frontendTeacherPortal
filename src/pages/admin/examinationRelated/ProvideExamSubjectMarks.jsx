import React, { useEffect, useState } from 'react'
import { BlueButton } from '../../../components/buttonStyles'
import {
    Autocomplete, Box, Checkbox, FormControl, FormControlLabel, Grid, Paper, TextField, Typography
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSclassList } from '../../../redux/userRelated/systemHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import TableTemplate from '../../../components/TableTemplate';
import { useParams } from 'react-router-dom';
import { addingFunction } from '../../../redux/userRelated/userHandle';
import { getExamStudentList } from '../../../redux/userRelated/examHandle';

const ProvideExamSubjectMarks = () => {
    const dispatch = useDispatch();
    const { examinationType, examSubjectName, examSubjectID, sessionYear } = useParams();

    const {
        currentToken, examStudentList, sclassList,
        responseExamStudentList, status, error, response,
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [openTab, setOpenTab] = useState(false)

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const [studentStates, setStudentStates] = useState({});

    const handleAbsentStatusChange = (id, value) => {
        setStudentStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                absentStatus: value,
                marksObtained: value ? 0 : prevState[id]?.marksObtained || "",
            },
        }));
    };

    const handleMarksObtainedChange = (id, value) => {
        setStudentStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                marksObtained: value,
            },
        }));
    };

    const handleTeacherNoteChange = (id, value) => {
        setStudentStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                teacherNote: value,
            },
        }));
    };

    const tabOpenHandler = () => {
        if (!sclassName) {
            dispatch(setPopupMessage("Please Select Class First"));
        } else if (!sectionName) {
            dispatch(setPopupMessage("Please Select Section First"));
        } else {
            dispatch(getExamStudentList(sclassName, sectionName, sessionYear, currentToken, examinationType))
            setOpenTab(!openTab);
        }
    };

    const saveHandler = (id) => {

        if (studentStates[id] === undefined) {
            dispatch(setPopupMessage("Please fill in the marks obtained for the student."));
            return;
        }
        else {
            const { absentStatus, marksObtained, teacherNote } = studentStates[id];

            if (marksObtained === "") {
                dispatch(setPopupMessage("Please fill in the marks obtained for the student."));
                return;
            }

            const fields = {
                student: id,
                examinationType,
                sessionYear,
                examSubject: examSubjectID,
                absentStatus: absentStatus === undefined ? false : absentStatus,
                marksObtained: absentStatus ? 0 : parseInt(marksObtained),
                teacherNote: teacherNote === undefined ? "" : teacherNote,
            };

            dispatch(addingFunction("studentExamSubjectProvideMarks", fields, currentToken))
        }
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 120 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'gender', label: 'Gender', minWidth: 100 },
        { id: 'absentStatus', label: 'Attendance', minWidth: 170 },
        { id: 'marksObtained', label: 'Marks', minWidth: 170 },
        { id: 'teacherNote', label: 'Note', minWidth: 170 },
    ];

    const studentRows = examStudentList && examStudentList.length > 0 && examStudentList.map((student) => {
        const id = student._id;
        return {
            name: student?.name,
            rollNum: student.rollNum,
            gender: student.gender,
            absentStatus:
                <FormControlLabel
                    label="Absent"
                    control={
                        <Checkbox
                            checked={studentStates[id]?.absentStatus || false}
                            onChange={(event) => {
                                handleAbsentStatusChange(id, event.target.checked);
                            }}
                        />
                    }
                />,
            marksObtained:
                <TextField
                    label="Marks Obtained"
                    variant="outlined"
                    value={studentStates[id]?.absentStatus ? "0" : studentStates[id]?.marksObtained || ""}
                    // value={studentStates[id]?.marksObtained || ""}
                    name="marksObtained"
                    id="marksObtained"
                    type='number'
                    onChange={(e) => handleMarksObtainedChange(id, e.target.value)}
                    disabled={studentStates[id]?.absentStatus || false}
                    required
                />,
            teacherNote:
                <TextField
                    label="Note"
                    variant="outlined"
                    value={studentStates[id]?.teacherNote || ""}
                    name="teacherNote"
                    id="teacherNote"
                    onChange={(e) => handleTeacherNoteChange(id, e.target.value)}
                    required
                />,
            id: id,
        };
    });

    const StudentButtonHaver = ({ row }) => {
        return (
            <BlueButton variant="contained" onClick={() => saveHandler(row.id)}>
                Save
            </BlueButton>
        );
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(setPopupMessage("Done Successfully"))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch]);

    return (
        <>
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    {examSubjectName}
                </Typography>
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
                    {responseExamStudentList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no students found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden', mb: 5 }}>
                                {Array.isArray(examStudentList) && examStudentList.length > 0 &&
                                    <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                                }
                            </Paper>
                        </>
                    }
                </>
            }
        </>
    )
}

export default ProvideExamSubjectMarks