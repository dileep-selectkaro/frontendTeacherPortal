import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography,
    FormControl,
    Autocomplete,
    Grid,
    Container,
    FormHelperText,
    CircularProgress
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { LightPurpleButton } from "../../../components/buttonStyles";
import { getSclassList } from "../../../redux/userRelated/systemHandle";
import { getSpecificSubjectGroupList } from "../../../redux/userRelated/classHandle";

const AddHomework = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        sclassList, specificSubjectGroupList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const [subjectList, setSubjectList] = useState([])
    const [subject, setSubject] = useState("")
    const [subjectGroup, setSubjectGroup] = useState("")

    useEffect(() => {
        if (sclassName && sectionName) {
            dispatch(getSpecificSubjectGroupList(sclassName, sectionName, currentToken))
        }
    }, [sclassName, sectionName, currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        homeworkDate: '',
        submissionDate: '',
        maxMarks: '',
        description: '',
    });

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        setFile(selectedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [formErrors, setFormErrors] = useState({
        file: '',
    });

    const validateForm = () => {
        let valid = true;
        const errors = {
            file: '',
        };

        if (!file) {
            errors.file = 'PDF file is required';
            valid = false;
        } else if (file.type !== 'application/pdf') {
            errors.file = 'Only PDF files are allowed';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (validateForm()) {

            const newFormData = new FormData();
            newFormData.append('sclass', sclassName);
            newFormData.append('section', sectionName);
            newFormData.append('subjectGroup', subjectGroup);
            newFormData.append('subject', subject);
            newFormData.append('homeworkDate', formData.homeworkDate);
            newFormData.append('submissionDate', formData.submissionDate);
            newFormData.append('maxMarks', formData.maxMarks);
            newFormData.append('attachDocument', file);
            newFormData.append('attachDocumentName', file.name);
            newFormData.append('description', formData.description);

            setLoader(true);
            dispatch(addingFunction("createHomework", newFormData, currentToken))
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
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 5 }}>
                <Grid item xs={10} sm={8}>
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Add Homework
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={submitHandler}>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
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
                        <Grid item xs={12} md={4}>
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
                                    type="date"
                                    label="Homework Date"
                                    name="homeworkDate"
                                    value={formData.homeworkDate}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Submission Date"
                                    name="submissionDate"
                                    value={formData.submissionDate}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Max Marks"
                                    name="maxMarks"
                                    value={formData.maxMarks}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Homework Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                style={{
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <input
                                    type="file"
                                    accept=".pdf"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    id="pdf-upload"
                                />
                                {file ?
                                    <Typography variant="body1">Selected File: {file.name}</Typography>
                                    :
                                    <label htmlFor="pdf-upload">
                                        <Typography variant="body1" sx={{ cursor: 'pointer', color: "rgba(102, 102, 102)" }}>
                                            Drag & Drop or Click to Upload PDF
                                        </Typography>
                                    </label>
                                }
                                <FormHelperText>{formErrors.file}</FormHelperText>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                                <LightPurpleButton
                                    variant='contained'
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                                </LightPurpleButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Box>
    );
}

export default AddHomework