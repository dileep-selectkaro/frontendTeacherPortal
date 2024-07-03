import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete, RadioGroup,
    FormControlLabel, Radio, Checkbox
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddExamination = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { examGroup } = useParams()
    const {
        status, currentToken, response, sessionYearsList,
        error, currentSessionYear
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [examName, setExamName] = useState('')
    const [sessionYear, setSessionYear] = useState(`${currentSessionYear}`)

    const [publish, setPublish] = useState(false);
    const [publishResult, setPublishResult] = useState(true);
    const [rollNumInfo, setRollNumInfo] = useState("Admit Card Roll No.");

    const [description, setDescription] = useState("");

    const fields = {
        examName,
        sessionYear,
        publish,
        publishResult,
        rollNumInfo,
        description,
        examGroup,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("examinationCreate", fields, currentToken))
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
                        Add Examination
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Exam"
                                variant="outlined"
                                value={examName}
                                onChange={(e) => setExamName(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <Autocomplete
                                options={sessionYearsList || []}
                                getOptionLabel={(option) => option.toString()}
                                value={sessionYear || null}
                                onChange={(event, newValue) => {
                                    setSessionYear(newValue || null);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Session" required fullWidth />
                                )}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                            <FormControlLabel
                                label="Publish"
                                control={
                                    <Checkbox
                                        checked={publish}
                                        onChange={(event) => {
                                            setPublish(event.target.checked);
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Publish Result"
                                control={
                                    <Checkbox
                                        checked={publishResult}
                                        onChange={(event) => {
                                            setPublishResult(event.target.checked);
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-label='rollNumInfo'
                                name="rollNumInfo"
                                value={rollNumInfo}
                                onChange={(e) => setRollNumInfo(e.target.value)}
                            >
                                <FormControlLabel value='Admit Card Roll No.' label='Admit Card Roll No.' control={<Radio />} />
                                <FormControlLabel value='Profile Roll No.' label='Profile Roll No.' control={<Radio />} />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                rows={4}
                                multiline
                                label="Description"
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

export default AddExamination

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