import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddMarksDivision = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [marksDivisionName, setMarksDivisionName] = useState('')
    const [percentFrom, setPercentFrom] = useState(100)
    const [percentUpto, setPercentUpto] = useState(0);

    const fields = {
        marksDivisionName,
        percentFrom,
        percentUpto,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("marksDivisionCreate", fields, currentToken))
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
                        Add Marks Division
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Division Name"
                                variant="outlined"
                                value={marksDivisionName}
                                name="marksDivisionName"
                                id="marksDivisionName"
                                onChange={(e) => setMarksDivisionName(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Percent From"
                                type="number"
                                variant="outlined"
                                value={percentFrom}
                                name="percentFrom"
                                id="percentFrom"
                                onChange={(e) => setPercentFrom(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Percent From"
                                type="number"
                                variant="outlined"
                                value={percentUpto}
                                name="percentUpto"
                                id="percentUpto"
                                onChange={(e) => setPercentUpto(e.target.value)}
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

export default AddMarksDivision

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