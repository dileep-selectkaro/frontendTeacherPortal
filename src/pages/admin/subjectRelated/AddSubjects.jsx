import React, { useEffect, useState } from "react";
import {
    Button, TextField, Grid, Box,
    Typography, CircularProgress,
    InputLabel, FormControl, Select, MenuItem
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';

const AddSubjects = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, response, error, currentToken } = useSelector(state => state.user);

    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", subType: "Theory" }]);

    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectTypeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subType = event.target.value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", subType: "Theory" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        subjects
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addingFunction("subjectCreate", fields, currentToken))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate(-1)
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
        <Box m={2}>
            <form onSubmit={submitHandler}>
                <Box mb={2}>
                    <Typography variant="h6" >Add Subjects</Typography>
                </Box>
                <Grid container spacing={2}>
                    {subjects.map((subject, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Subject Name"
                                    variant="outlined"
                                    value={subject.subName}
                                    onChange={handleSubjectNameChange(index)}
                                    sx={styles.inputField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Subject Code"
                                    variant="outlined"
                                    value={subject.subCode}
                                    onChange={handleSubjectCodeChange(index)}
                                    sx={styles.inputField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FormControl fullWidth>
                                    <InputLabel>Subject Type</InputLabel>
                                    <Select
                                        label='Subject Type'
                                        value={subject.subType}
                                        onChange={handleSubjectTypeChange(index)}
                                    >
                                        <MenuItem value='Theory'>Theory</MenuItem>
                                        <MenuItem value='Practical'>Practical</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box display="flex" alignItems="flex-end">
                                    {index === 0 ? (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddSubject}
                                        >
                                            Add Another Subject
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={handleRemoveSubject(index)}
                                        >
                                            Remove This Subject
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" type="submit" disabled={loader}>
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddSubjects

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