import React, { useEffect, useState } from 'react'
import { BlueButton } from '../../../components/buttonStyles'
import {
    Autocomplete, Box, FormControl,
    Grid, IconButton, Paper, TextField, Tooltip, Typography
} from '@mui/material';
import { Download, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSclassList } from '../../../redux/userRelated/systemHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { getDailyAssignmentList, getSpecificSubjectGroupList } from '../../../redux/userRelated/classHandle';
import { handleDownload } from '../../../utils/helperFunctions';
import TableTemplate from '../../../components/TableTemplate';

const ShowDailyAssignments = () => {
    const dispatch = useDispatch();

    const {
        currentToken, dailyAssignmentList, sclassList, currentDate,
        responseDailyAssignmentList, status, error, response,
        specificSubjectGroupList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [openTab, setOpenTab] = useState(false)

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const [subjectList, setSubjectList] = useState([])
    const [subject, setSubject] = useState("")
    const [subjectGroup, setSubjectGroup] = useState("")
    const [date, setDate] = useState(`${currentDate}`)

    useEffect(() => {
        if (sclassName && sectionName) {
            dispatch(getSpecificSubjectGroupList(sclassName, sectionName, currentToken))
        }
    }, [sclassName, sectionName, currentToken, dispatch]);

    const tabOpenHandler = () => {
        if (!sclassName) {
            dispatch(setPopupMessage("Please Select Class First"))
        }
        else if (!sectionName) {
            dispatch(setPopupMessage("Please Select Section First"))
        }
        else {
            dispatch(getDailyAssignmentList(sclassName, sectionName, subjectGroup, subject, date, currentToken))
            setOpenTab(!openTab)
        }
    }

    const homeworkColumns = [
        { id: 'sclass', label: 'Class', width: 20 },
        { id: 'section', label: 'Section', width: 170 },
        { id: 'subjectGroup', label: 'Subject Group', width: 170 },
        { id: 'subject', label: 'Subject', width: 170 },
        { id: 'homeworkDate', label: 'Homework Date', width: 100 },
        { id: 'submissionDate', label: 'Submission Date', width: 100 },
        // { id: 'evaluationDate', label: 'Evaluation Date', width: 100 },
        { id: 'maxMarks', label: 'Max Marks', width: 170 },
    ];

    const homeworkRows = dailyAssignmentList && dailyAssignmentList.length > 0 && dailyAssignmentList.map((homework) => {
        const formatDate = (date) => {
            const isoDate = new Date(date).toISOString();
            return isoDate.split('T')[0];
        };

        const homeworkDateString = homework?.homeworkDate ? formatDate(homework.homeworkDate) : null;
        const submissionDateDateString = homework?.submissionDate ? formatDate(homework.submissionDate) : null;

        return {
            sclass: homework.sclass.sclassName,
            section: homework.section.sectionName,
            subjectGroup: homework.subjectGroup.subjectGroupName,
            subject: homework.subject.subName,
            homeworkDate: homeworkDateString,
            submissionDate: submissionDateDateString,
            maxMarks: homework.maxMarks,
            attachDocument: homework.attachDocument,
            attachDocumentName: homework.attachDocumentName,
            description: homework.description,
            id: homework._id,
        };
    })

    const HomeworksButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title={row?.attachDocumentName}>
                    <IconButton onClick={() => handleDownload(row?.attachDocument, `${row?.attachDocumentName}`)} color="secondary">
                        <Download color="primary" />
                    </IconButton >
                </Tooltip>
            </>
        );
    };

    useEffect(() => {
        if (status === 'updated') {
            dispatch(underControl())
            dispatch(getDailyAssignmentList(sclassName, sectionName, subjectGroup, subject, date, currentToken))
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch, sclassName, sectionName, subjectGroup, subject, currentToken, date]);

    return (
        <>
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Select Criteria
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
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={specificSubjectGroupList || []}
                            getOptionLabel={(option) => (option?.subjectGroupName || '')}
                            value={specificSubjectGroupList?.find((item) => item?._id === subjectGroup) || null}
                            onChange={(event, newValue) => {
                                setSubjectGroup(newValue?._id || '');
                                setSubjectList(newValue?.subjects || []);
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Subject Group"
                                    required
                                    fullWidth />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={subjectList || []}
                            getOptionLabel={(option) => (option?.subName || '')}
                            value={subjectList?.find((item) => item?._id === subject) || null}
                            onChange={(event, newValue) => {
                                setSubject(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Subject"
                                    required
                                    fullWidth />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            label="Date"
                            variant="outlined"
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                    {responseDailyAssignmentList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no results found
                            </Typography>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(dailyAssignmentList) && dailyAssignmentList.length > 0 &&
                                <TableTemplate buttonHaver={HomeworksButtonHaver} columns={homeworkColumns} rows={homeworkRows} />
                            }
                        </Paper>
                    }
                </>
            }
        </>
    )
}

export default ShowDailyAssignments