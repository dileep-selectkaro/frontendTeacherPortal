import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip, FormControl,
    TextField, Stack, Autocomplete, Typography
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { DriveFileRenameOutline } from '@mui/icons-material';
import { getSclassList, getAssignedClassTeacherList, getTeacherList } from '../../../redux/userRelated/systemHandle';
import { BlueButton, PurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import FullEditTemplate from '../../../components/FullEditTemplate';
import { formatNameObj } from '../../../utils/helperFunctions';

const ShowAssignedClassTeacher = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        assignedClassTeacherList, currentToken, loading,
        responseAssignedClassTeacherList, status, error, response,
        sclassList, teacherList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAssignedClassTeacherList(currentToken))
    }, [dispatch, currentToken]);

    const [open, setOpen] = useState(false);
    const [assignedClassTeacherID, setAssignedClassTeacherID] = useState("");

    const [sclassName, setSclassName] = useState('')
    const [sections, setSections] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [classSectionList, setClassSectionList] = useState([])

    const dialogOpener = (row) => {
        dispatch(getSclassList(currentToken, "allSclassList"));
        dispatch(getTeacherList(currentToken, "allTeacherList"));
        setAssignedClassTeacherID(row?._id)
        setSclassName(row?.sclassName?._id);
        setClassSectionList(row?.sclassName?.sections);
        setSections(row?.sections);
        setTeachers(row?.teachers);
        setOpen(true);
    };

    const fields = {
        sclassName,
        sections,
        teachers,
    };

    const editHandler = (event) => {
        event.preventDefault();

        if (sections.length === 0) {
            dispatch(setPopupMessage("Select Sections"))
        }
        else if (teachers.length === 0) {
            dispatch(setPopupMessage("Select Teachers"))
        }
        else {
            dispatch(updatingFunction(assignedClassTeacherID, fields, "assignedClassTeacherUpdate", currentToken))
        }
    };

    const assignedClassTeacherColumns = [
        { id: 'sclassName', label: 'Class', minWidth: 170 },
        { id: 'classSections', label: 'Sections', minWidth: 170 },
        { id: 'teacherNames', label: 'Teachers', minWidth: 170 },
    ]

    const assignedClassTeacherRows = assignedClassTeacherList.map((assignedClassTeacher) => {

        const sectionNames = assignedClassTeacher?.sections?.map(item => item?.sectionName).join(', ');
        const teacherNames = assignedClassTeacher?.teachers?.map(item => item?.teacherName && formatNameObj(item?.teacherName)).join(', ');

        return {
            id: assignedClassTeacher?._id,
            sclassName: assignedClassTeacher?.sclassName?.sclassName,
            classSections: sectionNames,
            teacherNames: teacherNames,

            data: assignedClassTeacher
        };
    })

    const AssignedClassTeachersButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row?.data)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Assign Class Teacher',
            action: () => navigate("/Admin/classTeachers/assignClassTeacher")
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getAssignedClassTeacherList(currentToken))
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
                    {responseAssignedClassTeacherList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton onClick={() => navigate("/Admin/classTeachers/assignClassTeacher")}>
                                Assign Class Teacher
                            </PurpleButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(assignedClassTeacherList) && assignedClassTeacherList.length > 0 &&
                                <TableTemplate buttonHaver={AssignedClassTeachersButtonHaver} columns={assignedClassTeacherColumns} rows={assignedClassTeacherRows} />
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
                                Edit Assigned Class Teacher
                            </Typography>
                        </Stack>
                        <form onSubmit={editHandler}>
                            <Stack spacing={3}>
                                <FormControl>
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
                                <FormControl>
                                    <Autocomplete
                                        multiple
                                        id="sections"
                                        options={classSectionList}
                                        getOptionLabel={(option) => option.sectionName || ''}
                                        value={sections}
                                        onChange={(event, newValue) => setSections(newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="Sections" />
                                        )}
                                        filterSelectedOptions
                                        required
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                    />
                                </FormControl>
                                <FormControl>
                                    <Autocomplete
                                        multiple
                                        id="teachers"
                                        options={teacherList}
                                        getOptionLabel={(option) => formatNameObj(option?.teacherName) || ''}
                                        value={teachers}
                                        onChange={(event, newValue) => setTeachers(newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="Teachers" />
                                        )}
                                        filterSelectedOptions
                                        required
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
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

export default ShowAssignedClassTeacher;