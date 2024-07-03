import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, InputLabel,
    Select, MenuItem
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";

const AddPhoneCallLog = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [providedName, setProvidedName] = useState('');
    const [phone, setPhone] = useState('');
    const [callDuration, setCallDuration] = useState('');
    const [date, setDate] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [note, setNote] = useState('');
    const [description, setDescription] = useState('');
    const [callType, setCallType] = useState('Incoming');

    const fields = {
        providedName,
        phone,
        date,
        followUpDate,
        callDuration,
        description,
        note,
        callType,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createPhoneCallLog", fields, currentToken))
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
                        Admission Enquiry
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                name="providedName"
                                id="providedName"
                                value={providedName}
                                onChange={(e) => setProvidedName(e.target.value)}
                                sx={styles.inputField}
                                required
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
                            <TextField
                                fullWidth
                                type="date"
                                label="Next Follow Up Date"
                                variant="outlined"
                                name="followUpDate"
                                id="followUpDate"
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                                sx={styles.inputField}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                label="Call Duration"
                                variant="outlined"
                                name="callDuration"
                                id="callDuration"
                                value={callDuration}
                                onChange={(e) => setCallDuration(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                rows={4}
                                multiline
                                label="Description"
                                variant="outlined"
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
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
                        <FormControl fullWidth>
                            <InputLabel htmlFor="callType">Call Type</InputLabel>
                            <Select
                                label='Call Type'
                                id="callType"
                                name="callType"
                                value={callType}
                                onChange={(e) => setCallType(e.target.value)}
                            >
                                <MenuItem value='Incoming'>Incoming</MenuItem>
                                <MenuItem value='Outgoing'>Outgoing</MenuItem>
                            </Select>
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

export default AddPhoneCallLog

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