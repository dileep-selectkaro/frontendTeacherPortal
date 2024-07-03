import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";

const AddReferences = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [references, setReferences] = useState([
        { referenceName: "", referenceDescription: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleReferenceNameChange = (index) => (event) => {
        const newReferences = [...references];
        newReferences[index].referenceName = event.target.value;
        setReferences(newReferences);
    };

    const handleReferenceDescriptionChange = (index) => (event) => {
        const newReferences = [...references];
        newReferences[index].referenceDescription = event.target.value;
        setReferences(newReferences);
    };

    const handleAddReference = () => {
        setReferences([...references, { referenceName: "", referenceDescription: "" }]);
    };

    const handleRemoveReference = (index) => () => {
        const newReferences = [...references];
        newReferences.splice(index, 1);
        setReferences(newReferences);
    };

    const fields = {
        references,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("referenceCreate", fields, currentToken))
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
                        Add References
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {references.map((reference, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Reference Name"
                                        variant="outlined"
                                        id="referenceName"
                                        name="referenceName"
                                        value={reference.referenceName}
                                        onChange={handleReferenceNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Reference Description"
                                        variant="outlined"
                                        id="referenceDescription"
                                        name="referenceDescription"
                                        value={reference.referenceDescription}
                                        onChange={handleReferenceDescriptionChange(index)}
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
                                                onClick={handleAddReference}
                                            >
                                                Add Another Reference
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveReference(index)}
                                            >
                                                Remove Reference
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

export default AddReferences

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