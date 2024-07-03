import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";
import { getRoomTypeList, getHostelList } from "../../../redux/userRelated/hostelHandle";

const AddHostelRoom = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        hostelList, roomTypeList
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [hostelRoomName, setHostelRoomName] = useState('');
    const [hostel, setHostel] = useState('');
    const [roomType, setRoomType] = useState('');

    const [bedNumber, setBedNumber] = useState('');
    const [costPerBed, setCostPerBed] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getHostelList(currentToken))
        dispatch(getRoomTypeList(currentToken))
    }, [currentToken, dispatch]);

    const fields = {
        hostelRoomName,
        hostel,
        roomType,
        bedNumber,
        costPerBed,
        description,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createHostelRoom", fields, currentToken))
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
                        Add Hostel Room
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Room Number / Name"
                                variant="outlined"
                                name="hostelRoomName"
                                id="hostelRoomName"
                                value={hostelRoomName}
                                onChange={(e) => setHostelRoomName(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={hostelList || []}
                                getOptionLabel={(option) => (option?.hostelName || '')}
                                value={hostelList?.find((item) => item?._id === hostel) || null}
                                onChange={(event, newValue) => {
                                    setHostel(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Hostel"
                                        name="hostel"
                                        id="hostel"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={roomTypeList || []}
                                getOptionLabel={(option) => (option?.roomTypeName || '')}
                                value={roomTypeList?.find((item) => item?._id === roomType) || null}
                                onChange={(event, newValue) => {
                                    setRoomType(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Room Type"
                                        name="roomType"
                                        id="roomType"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Number of Beds"
                                variant="outlined"
                                name="bedNumber"
                                id="bedNumber"
                                value={bedNumber}
                                onChange={(e) => setBedNumber(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Cost Per Bed"
                                variant="outlined"
                                name="costPerBed"
                                id="costPerBed"
                                value={costPerBed}
                                onChange={(e) => setCostPerBed(e.target.value)}
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

export default AddHostelRoom

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