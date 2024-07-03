import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, TextField, FormControl,
    Grid, Typography, Button, Container, Tooltip, IconButton
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getMarksGradeList } from '../../../redux/userRelated/examHandle';
import { LightPurpleButton } from '../../../components/buttonStyles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import FullEditTemplate from '../../../components/FullEditTemplate';
import { getSubjectList } from '../../../redux/userRelated/systemHandle';
import { DriveFileRenameOutline } from '@mui/icons-material';

const ShowMarksGrade = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        currentToken, marksGradeList,
        responseMarksGradeList,
        status, error, response, loading
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getMarksGradeList(currentToken))
    }, [dispatch, currentToken]);

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

    const [marksGradeID, setMarksGradeID] = useState("")

    const [open, setOpen] = useState(false);

    const dialogOpener = (row) => {
        dispatch(getSubjectList(currentToken))
        setOpen(true);
        setMarksGradeID(row?._id)
        setFormData(row?.marksGradeDetails);
    }

    const editHandler = () => {
        dispatch(updatingFunction(marksGradeID, formData, "marksGradeUpdate", currentToken))
    }

    const marksGradeColumns = [
        { id: 'examType', label: 'Exam Type', flex: 1, minWidth: 100 },
        { id: 'gradeName', label: 'Grade Name', flex: 1, minWidth: 100 },
        { id: 'percentFromUpto', label: 'Percent From / Upto', flex: 1, minWidth: 100 },
        { id: 'gradePoint', label: 'Grade Point', flex: 1, minWidth: 100 }
    ];

    const marksGradeRows = marksGradeList?.flatMap((item) => {
        return item.marksGradeDetails.map((detail, index) => ({
            examType: index === 0 ? item.examType : '',
            gradeName: detail.gradeName,
            percentFromUpto: `${detail.percentFrom.toFixed(2)} to ${detail.percentUpto.toFixed(2)}`,
            gradePoint: detail.gradePoint.toFixed(1),
            data: item,
            id: detail?._id,
        }));
    });

    const MarksGradeButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add Marks Grade',
            action: () => navigate(`/Admin/marksGrade/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            dispatch(underControl())
            setOpen(false);
            dispatch(getMarksGradeList(currentToken))
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
            setOpen(false);
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
            setOpen(false);
        }
    }, [status, error, response, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseMarksGradeList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            Sorry no marks grades right now
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(marksGradeList) && marksGradeList.length > 0 &&
                                <TableTemplate buttonHaver={MarksGradeButtonHaver} columns={marksGradeColumns} rows={marksGradeRows} />
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
                <Grid container spacing={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 5 }}>
                    <Grid item xs={10} sm={8}>
                        <Typography variant="h5" gutterBottom textAlign="center">
                            Edit Marks Grade
                        </Typography>
                    </Grid>
                </Grid>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <Grid container spacing={2}>
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
                                <LightPurpleButton variant='contained' onClick={editHandler} >
                                    Save Changes
                                </LightPurpleButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </FullEditTemplate>
        </>
    );
};

export default ShowMarksGrade;