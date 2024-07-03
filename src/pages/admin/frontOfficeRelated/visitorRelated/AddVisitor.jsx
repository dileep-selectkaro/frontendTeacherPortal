import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, MenuItem, Select, InputLabel,
    Autocomplete
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";
import { getPurposeList } from "../../../../redux/userRelated/frontOfficeHandle";

import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

const AddVisitor = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        purposeList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getPurposeList(currentToken))
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [visitorName, setVisitorName] = useState('');
    const [meetingWith, setMeetingWith] = useState('Student');
    const [purpose, setPurpose] = useState('');
    const [phone, setPhone] = useState('');
    const [idCard, setIdCard] = useState('');
    const [numberOfPerson, setNumberOfPerson] = useState('');
    const [date, setDate] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
    const [note, setNote] = useState('');

    const fields = {
        visitorName,
        meetingWith,
        purpose,
        phone,
        idCard,
        numberOfPerson,
        date,
        inTime,
        outTime,
        note,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createVisitor", fields, currentToken))
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
                        Add Visitor
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                name="visitorName"
                                id="visitorName"
                                value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="meetingWith">Meeting With</InputLabel>
                            <Select
                                label='Meeting With'
                                id="meetingWith"
                                name="meetingWith"
                                value={meetingWith}
                                onChange={(e) => setMeetingWith(e.target.value)}
                            >
                                <MenuItem value='Student'>Student</MenuItem>
                                <MenuItem value='Staff'>Staff</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={purposeList || []}
                                getOptionLabel={(option) => (option?.purposeName || '')}
                                value={purposeList?.find((item) => item?._id === purpose) || null}
                                onChange={(event, newValue) => {
                                    setPurpose(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Purpose"
                                        name="purpose"
                                        id="purpose"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                label="Phone"
                                variant="outlined"
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="ID Card"
                                variant="outlined"
                                name="idCard"
                                id="idCard"
                                value={idCard}
                                onChange={(e) => setIdCard(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                label="Number of Persons"
                                variant="outlined"
                                name="numberOfPerson"
                                id="numberOfPerson"
                                value={numberOfPerson}
                                onChange={(e) => setNumberOfPerson(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date"
                                variant="outlined"
                                name="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                sx={styles.inputField}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    fullWidth
                                    label="In Time"
                                    name="inTime"
                                    id="inTime"
                                    value={inTime}
                                    onChange={(newValue) => setInTime(newValue)}
                                    required
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    fullWidth
                                    label="Out Time"
                                    name="outTime"
                                    id="outTime"
                                    value={outTime}
                                    onChange={(newValue) => setOutTime(newValue)}
                                    required
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                rows={4}
                                multiline
                                label="Note"
                                variant="outlined"
                                name="note"
                                id="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
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

export default AddVisitor

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