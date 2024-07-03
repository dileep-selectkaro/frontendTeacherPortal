import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";

const AddComplaintTypes = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [complaintTypes, setComplaintTypes] = useState([
        { complaintTypeName: "", complaintTypeDescription: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleComplaintTypeNameChange = (index) => (event) => {
        const newComplaintTypes = [...complaintTypes];
        newComplaintTypes[index].complaintTypeName = event.target.value;
        setComplaintTypes(newComplaintTypes);
    };

    const handleComplaintTypeDescriptionChange = (index) => (event) => {
        const newComplaintTypes = [...complaintTypes];
        newComplaintTypes[index].complaintTypeDescription = event.target.value;
        setComplaintTypes(newComplaintTypes);
    };

    const handleAddComplaintType = () => {
        setComplaintTypes([...complaintTypes, { complaintTypeName: "", complaintTypeDescription: "" }]);
    };

    const handleRemoveComplaintType = (index) => () => {
        const newComplaintTypes = [...complaintTypes];
        newComplaintTypes.splice(index, 1);
        setComplaintTypes(newComplaintTypes);
    };

    const fields = {
        complaintTypes,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("complaintTypeCreate", fields, currentToken))
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
                        Add Complaint Types
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {complaintTypes.map((complaintType, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Complaint Type Name"
                                        variant="outlined"
                                        id="complaintTypeName"
                                        name="complaintTypeName"
                                        value={complaintType.complaintTypeName}
                                        onChange={handleComplaintTypeNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Complaint Type Description"
                                        variant="outlined"
                                        id="complaintTypeDescription"
                                        name="complaintTypeDescription"
                                        value={complaintType.complaintTypeDescription}
                                        onChange={handleComplaintTypeDescriptionChange(index)}
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
                                                onClick={handleAddComplaintType}
                                            >
                                                Add Another Complaint Type
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveComplaintType(index)}
                                            >
                                                Remove Complaint Type
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

export default AddComplaintTypes

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