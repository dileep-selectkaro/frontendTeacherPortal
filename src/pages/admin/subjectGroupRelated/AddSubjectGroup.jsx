import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";
import { getSclassList, getSubjectList } from "../../../redux/userRelated/systemHandle";

const AddSubjectGroup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response,
        error, sclassList, subjectList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
        dispatch(getSubjectList(currentToken))
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [subjectGroupName, setSubjectGroupName] = useState('')
    const [sclassName, setSclassName] = useState('')
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [description, setDescription] = useState("");

    const [classSectionList, setClassSectionList] = useState([])

    const fields = {
        subjectGroupName,
        sclassName,
        sections,
        subjects,
        description,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (sections.length === 0) {
            dispatch(setPopupMessage("Select Sections"))
        }
        else if (subjects.length === 0) {
            dispatch(setPopupMessage("Select Subjects"))
        }
        else {
            setLoader(true)
            dispatch(addingFunction("subjectGroupCreate", fields, currentToken))
        }
    };

    useEffect(() => {
        if (status === 'added') {
            navigate(-1);
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
            setLoader(false)
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
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
                        Add Subject Group
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
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
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                        </BlueButton>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default AddSubjectGroup

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