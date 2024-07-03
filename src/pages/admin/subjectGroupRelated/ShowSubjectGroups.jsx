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
import { Delete, DriveFileRenameOutline } from '@mui/icons-material';
import { getSclassList, getSubjectGroupList, getSubjectList } from '../../../redux/userRelated/systemHandle';
import { BlueButton, PurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { deleteUser, updatingFunction } from '../../../redux/userRelated/userHandle';
import FullEditTemplate from '../../../components/FullEditTemplate';

const ShowSubjectGroups = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        subjectGroupList, currentToken, loading,
        responseSubjectGroupList, status, error, response,
        sclassList, subjectList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectGroupList(currentToken))
    }, [dispatch, currentToken]);

    const [open, setOpen] = useState(false);
    const [subjectGroupID, setSubjectGroupID] = useState("");

    const [subjectGroupName, setSubjectGroupName] = useState('')
    const [sclassName, setSclassName] = useState('')
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [description, setDescription] = useState("");

    const [classSectionList, setClassSectionList] = useState([])

    const dialogOpener = (row) => {
        dispatch(getSclassList(currentToken, "allSclassList"));
        dispatch(getSubjectList(currentToken))
        setSubjectGroupID(row?._id)
        setSubjectGroupName(row?.subjectGroupName);
        setSclassName(row?.sclassName?._id);
        setClassSectionList(row?.sclassName?.sections);
        setSections(row?.sections);
        setSubjects(row?.subjects);
        setDescription(row?.description);
        setOpen(true);
    };

    const fields = {
        subjectGroupName,
        sclassName,
        sections,
        subjects,
        description,
    };

    const editHandler = (event) => {
        event.preventDefault();

        if (sections.length === 0) {
            dispatch(setPopupMessage("Select Sections"))
        }
        else if (subjects.length === 0) {
            dispatch(setPopupMessage("Select Subjects"))
        }
        else {
            dispatch(updatingFunction(subjectGroupID, fields, "subjectGroupUpdate", currentToken))
        }
    };

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
    }

    const subjectGroupColumns = [
        { id: 'subjectGroupName', label: 'Name', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
        { id: 'classSections', label: 'Sections', minWidth: 170 },
        { id: 'subjectNames', label: 'Subjects', minWidth: 170 },
    ]

    const subjectGroupRows = subjectGroupList.map((subjectGroup) => {

        const sectionNames = subjectGroup?.sections?.map(item => item?.sectionName).join(', ');
        const subjectNames = subjectGroup?.subjects?.map(item => item?.subName).join(', ');

        return {
            id: subjectGroup?._id,
            sclassName: subjectGroup?.sclassName?.sclassName,
            classSections: sectionNames,
            subjectNames: subjectNames,

            subjectGroupName: subjectGroup?.subjectGroupName,
            description: subjectGroup?.description,
            data: subjectGroup
        };
    })

    const SubjectGroupsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row?.data)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deleteHandler(row.id, "deleteSubjectGroup")}>
                        <Delete color="error" />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject Group',
            action: () => navigate(`/Admin/subjectGroups/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getSubjectGroupList(currentToken))
            dispatch(underControl())
        }
        if (status === 'deleted') {
            dispatch(getSubjectGroupList(currentToken))
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
                    {responseSubjectGroupList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton onClick={() => navigate("/Admin/subjectGroups/add")}>
                                Add Subject Group
                            </PurpleButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(subjectGroupList) && subjectGroupList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectGroupsButtonHaver} columns={subjectGroupColumns} rows={subjectGroupRows} />
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
                                Edit Subject Group
                            </Typography>
                        </Stack>
                        <form onSubmit={editHandler}>
                            <Stack spacing={3}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        value={subjectGroupName}
                                        name="subjectGroupName"
                                        id="subjectGroupName"
                                        onChange={(e) => setSubjectGroupName(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
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
                                        id="subjects"
                                        options={subjectList}
                                        getOptionLabel={(option) => option?.subName || ''}
                                        value={subjects}
                                        onChange={(event, newValue) => setSubjects(newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="Subjects" />
                                        )}
                                        filterSelectedOptions
                                        required
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Description"
                                        name="description"
                                        id="description"
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

export default ShowSubjectGroups;

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