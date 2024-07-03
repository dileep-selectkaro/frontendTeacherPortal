import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddRoomTypes = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [roomTypes, setRoomTypes] = useState([
        { roomTypeName: "", roomTypeDescription: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleRoomTypeNameChange = (index) => (event) => {
        const newRoomTypes = [...roomTypes];
        newRoomTypes[index].roomTypeName = event.target.value;
        setRoomTypes(newRoomTypes);
    };

    const handleRoomTypeDescriptionChange = (index) => (event) => {
        const newRoomTypes = [...roomTypes];
        newRoomTypes[index].roomTypeDescription = event.target.value;
        setRoomTypes(newRoomTypes);
    };

    const handleAddRoomType = () => {
        setRoomTypes([...roomTypes, { roomTypeName: "", roomTypeDescription: "" }]);
    };

    const handleRemoveRoomType = (index) => () => {
        const newRoomTypes = [...roomTypes];
        newRoomTypes.splice(index, 1);
        setRoomTypes(newRoomTypes);
    };

    const fields = {
        roomTypes,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("roomTypeCreate", fields, currentToken))
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
                        Add Room Types
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {roomTypes.map((roomType, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Room Type Name"
                                        variant="outlined"
                                        id="roomTypeName"
                                        name="roomTypeName"
                                        value={roomType.roomTypeName}
                                        onChange={handleRoomTypeNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Room Type Description"
                                        variant="outlined"
                                        id="roomTypeDescription"
                                        name="roomTypeDescription"
                                        value={roomType.roomTypeDescription}
                                        onChange={handleRoomTypeDescriptionChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <Grid item xs={10}>
                                    <Box display="flex" justifyContent="flex-end"  >
                                        {index === 0 ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleAddRoomType}
                                            >
                                                Add Another Room Type
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveRoomType(index)}
                                            >
                                                Remove Room Type
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        ))}

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

export default AddRoomTypes

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