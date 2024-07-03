import React, { useEffect, useState } from 'react'
import { BlueButton } from '../../../components/buttonStyles'
import { useNavigate } from 'react-router-dom';
import {
    Autocomplete, Box, FormControl,
    Grid, IconButton, Paper, TextField, Tooltip, Typography
} from '@mui/material';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { Delete, Download, DriveFileRenameOutline, KeyboardArrowDown, KeyboardArrowUp, Menu, PostAdd } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSclassList } from '../../../redux/userRelated/systemHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { getHomeworkList, getSpecificSubjectGroupList } from '../../../redux/userRelated/classHandle';
import { handleDownload } from '../../../utils/helperFunctions';
import TableTemplate from '../../../components/TableTemplate';
import { deletingFunction } from '../../../redux/userRelated/userHandle';
import ConfirmDelete from '../../../components/ConfirmDelete';

const ShowHomeworks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        currentToken, homeworkList, sclassList,
        responseHomeworkList, status, error, response,
        specificSubjectGroupList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [openTab, setOpenTab] = useState(false)

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const [subjectList, setSubjectList] = useState([])
    const [subject, setSubject] = useState("")
    const [subjectGroup, setSubjectGroup] = useState("")

    const [itemID, setItemID] = useState("");

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
            dispatch(getHomeworkList(sclassName, sectionName, subjectGroup, subject, currentToken))
            setOpenTab(!openTab)
        }
    }

    const dialogOpener = (row) => {
        console.log(row)
    };

    const deletePopupOpener = (id) => {
        setItemID(id)
        setDialog("Do you want to delete this homework ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(itemID, "deleteHomework", currentToken))
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

    const homeworkRows = homeworkList && homeworkList.length > 0 && homeworkList.map((homework) => {
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
                <Tooltip title="Evaluation">
                    <IconButton onClick={() => navigate(`/Admin/homeworks/homeworkEvaluation/${row.id}`)} color="success">
                        <Menu color="success" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deletePopupOpener(row.id)}>
                        <Delete color="error" />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAdd color="primary" />, name: 'Add New Homework',
            action: () => navigate(`/Admin/homeworks/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            dispatch(underControl())
            dispatch(getHomeworkList(sclassName, sectionName, subjectGroup, subject, currentToken))
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(underControl())
            dispatch(getHomeworkList(sclassName, sectionName, subjectGroup, subject, currentToken))
        }
        else if (status === 'failed') {
            setShowDialog(false);
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            setShowDialog(false);
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch, sclassName, sectionName, subjectGroup, subject, currentToken]);

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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                    {responseHomeworkList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no results found
                            </Typography>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(homeworkList) && homeworkList.length > 0 &&
                                <TableTemplate buttonHaver={HomeworksButtonHaver} columns={homeworkColumns} rows={homeworkRows} />
                            }
                        </Paper>
                    }
                </>
            }
            <ConfirmDelete
                dialog={dialog}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                deleteHandler={deleteHandler}
            />
        </>
    )
}

export default ShowHomeworks