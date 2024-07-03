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
import { getSclassList, getTeacherList } from "../../../redux/userRelated/systemHandle";

const AssignClassTeacher = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response,
        error, sclassList, teacherList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
        dispatch(getTeacherList(currentToken, "allTeacherList"));
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [sclassName, setSclassName] = useState('')
    const [sections, setSections] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [classSectionList, setClassSectionList] = useState([])

    const fields = {
        sclassName,
        sections,
        teachers,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (sections.length === 0) {
            dispatch(setPopupMessage("Select Sections"))
        }
        else if (teachers.length === 0) {
            dispatch(setPopupMessage("Select Teachers"))
        }
        else {
            setLoader(true)
            dispatch(addingFunction("assignClassTeacherCreate", fields, currentToken))
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
                        Assign Class Teacher
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
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
                                getOptionLabel={(option) => option?.name || ''}
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

export default AssignClassTeacher