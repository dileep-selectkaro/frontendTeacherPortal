import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";

const AddPostal = ({ postalType }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [toTitle, setToTitle] = useState('');
    const [fromTitle, setFromTitle] = useState('');
    const [refrenceNo, setRefrenceNo] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [address, setAddress] = useState('');

    const fields = {
        toTitle,
        fromTitle,
        refrenceNo,
        address,
        note,
        date,
        postalType,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createPostal", fields, currentToken))
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
                        Add Postal {postalType}
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {postalType === "Dispatch" &&
                            <>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="To Title"
                                        variant="outlined"
                                        name="toTitle"
                                        id="toTitle"
                                        value={toTitle}
                                        onChange={(e) => setToTitle(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="From Title"
                                        variant="outlined"
                                        name="fromTitle"
                                        id="fromTitle"
                                        value={fromTitle}
                                        onChange={(e) => setFromTitle(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                            </>
                        }
                        {postalType === "Receive" &&
                            <>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="From Title"
                                        variant="outlined"
                                        name="fromTitle"
                                        id="fromTitle"
                                        value={fromTitle}
                                        onChange={(e) => setFromTitle(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="To Title"
                                        variant="outlined"
                                        name="toTitle"
                                        id="toTitle"
                                        value={toTitle}
                                        onChange={(e) => setToTitle(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                            </>
                        }
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
                                type="number"
                                label="Refrence No"
                                variant="outlined"
                                name="refrenceNo"
                                id="refrenceNo"
                                value={refrenceNo}
                                onChange={(e) => setRefrenceNo(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                rows={4}
                                multiline
                                label="Address"
                                variant="outlined"
                                name="address"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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

export default AddPostal

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