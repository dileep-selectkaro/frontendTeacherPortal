import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddStudentHouses = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [studentHouses, setStudentHouses] = useState([
        { studentHouseId: "", studentHouseName: "", studentHouseDescription: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleStudentHouseIdChange = (index) => (event) => {
        const newStudentHouses = [...studentHouses];
        newStudentHouses[index].studentHouseId = event.target.value;
        setStudentHouses(newStudentHouses);
    };

    const handleStudentHouseNameChange = (index) => (event) => {
        const newStudentHouses = [...studentHouses];
        newStudentHouses[index].studentHouseName = event.target.value;
        setStudentHouses(newStudentHouses);
    };

    const handleStudentHouseDescriptionChange = (index) => (event) => {
        const newStudentHouses = [...studentHouses];
        newStudentHouses[index].studentHouseDescription = event.target.value;
        setStudentHouses(newStudentHouses);
    };

    const handleAddStudentHouse = () => {
        setStudentHouses([...studentHouses, { studentHouseId: "", studentHouseName: "", studentHouseDescription: "" }]);
    };

    const handleRemoveStudentHouse = (index) => () => {
        const newStudentHouses = [...studentHouses];
        newStudentHouses.splice(index, 1);
        setStudentHouses(newStudentHouses);
    };

    const fields = {
        studentHouses,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createStudentHouse", fields, currentToken))
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
                        Add School House
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {studentHouses.map((studentHouse, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="House Id"
                                        variant="outlined"
                                        id="studentHouseId"
                                        name="studentHouseId"
                                        value={studentHouse.studentHouseId}
                                        onChange={handleStudentHouseIdChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="House Name"
                                        variant="outlined"
                                        id="studentHouseName"
                                        name="studentHouseName"
                                        value={studentHouse.studentHouseName}
                                        onChange={handleStudentHouseNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="House Description"
                                        variant="outlined"
                                        id="studentHouseDescription"
                                        name="studentHouseDescription"
                                        value={studentHouse.studentHouseDescription}
                                        onChange={handleStudentHouseDescriptionChange(index)}
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
                                                onClick={handleAddStudentHouse}
                                            >
                                                Add Another House
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveStudentHouse(index)}
                                            >
                                                Remove House
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

export default AddStudentHouses

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