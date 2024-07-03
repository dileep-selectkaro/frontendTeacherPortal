import {
    Box, Button, Container, FormControl, Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LightPurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { useNavigate } from 'react-router-dom';
import { addingFunction } from '../../../redux/userRelated/userHandle';

const AddMarksGrade = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        currentToken, status, error, response,
    } = useSelector(state => state.user);

    const [examType, setExamType] = useState('General Purpose (Pass/Fail)')

    const [formData, setFormData] = useState([{
        gradeName: "",
        percentUpto: "",
        percentFrom: "",
        gradePoint: "",
        description: "",
    }])

    const handleGradeNameChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].gradeName = event.target.value;
        setFormData(newFormData);
    };

    const handlePercentUptoChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].percentUpto = event.target.value;
        setFormData(newFormData);
    };

    const handlePercentFromChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].percentFrom = event.target.value;
        setFormData(newFormData);
    };

    const handleGradePointChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].gradePoint = event.target.value;
        setFormData(newFormData);
    };

    const handleDescriptionChange = (index) => (event) => {
        const newFormData = [...formData];
        newFormData[index].description = event.target.value;
        setFormData(newFormData);
    };

    const handleAddItem = () => {
        setFormData([...formData, {
            gradeName: "",
            percentUpto: "",
            percentFrom: "",
            gradePoint: "",
            description: "",
        }]);
    };

    const handleRemoveItem = (index) => () => {
        const newFormData = [...formData];
        newFormData.splice(index, 1);
        setFormData(newFormData);
    };

    const fields = {
        examType,
        marksGradeDetails: formData,
    };

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addingFunction("marksGradeCreate", fields, currentToken));
    }

    useEffect(() => {
        if (status === 'added') {
            navigate(-1)
            dispatch(underControl())
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, navigate, dispatch]);

    return (
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 5 }}>
                <Grid item xs={10} sm={8}>
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Add Marks Grade
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={submitHandler}>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <FormControl fullWidth>
                                <InputLabel>Exam Type</InputLabel>
                                <Select
                                    label='Exam Type'
                                    name="examType"
                                    value={examType}
                                    onChange={(e) => setExamType(e.target.value)}
                                >
                                    <MenuItem value='General Purpose (Pass/Fail)'>General Purpose (Pass/Fail)</MenuItem>
                                    <MenuItem value='School Based Grading System'>School Based Grading System</MenuItem>
                                    <MenuItem value='College Based Grading System'>College Based Grading System</MenuItem>
                                    <MenuItem value='GPA Grading System'>GPA Grading System</MenuItem>
                                    <MenuItem value='Average Passing'>Average Passing</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {formData.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Grade Name"
                                            name="gradeName"
                                            id="gradeName"
                                            variant="outlined"
                                            value={item.gradeName}
                                            onChange={handleGradeNameChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Percent Upto"
                                            type='number'
                                            variant="outlined"
                                            name="percentUpto"
                                            id="percentUpto"
                                            value={item.percentUpto}
                                            onChange={handlePercentUptoChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Percent From"
                                            type='number'
                                            name="percentFrom"
                                            id="percentFrom"
                                            variant="outlined"
                                            value={item.percentFrom}
                                            onChange={handlePercentFromChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Grade Point"
                                            type='number'
                                            name="gradePoint"
                                            id="gradePoint"
                                            variant="outlined"
                                            value={item.gradePoint}
                                            onChange={handleGradePointChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            id="description"
                                            variant="outlined"
                                            value={item.description}
                                            onChange={handleDescriptionChange(index)}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        {index === 0 ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleAddItem}
                                            >
                                                Add Item
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveItem(index)}
                                            >
                                                Remove Item
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                                <LightPurpleButton variant='contained' type="submit">
                                    Save
                                </LightPurpleButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Box>
    )
}

export default AddMarksGrade