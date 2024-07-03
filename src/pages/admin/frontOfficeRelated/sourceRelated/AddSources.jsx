import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";

const AddSources = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sources, setSources] = useState([
        { sourceName: "", sourceDescription: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleSourceNameChange = (index) => (event) => {
        const newSources = [...sources];
        newSources[index].sourceName = event.target.value;
        setSources(newSources);
    };

    const handleSourceDescriptionChange = (index) => (event) => {
        const newSources = [...sources];
        newSources[index].sourceDescription = event.target.value;
        setSources(newSources);
    };

    const handleAddSource = () => {
        setSources([...sources, { sourceName: "", sourceDescription: "" }]);
    };

    const handleRemoveSource = (index) => () => {
        const newSources = [...sources];
        newSources.splice(index, 1);
        setSources(newSources);
    };

    const fields = {
        sources,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("sourceCreate", fields, currentToken))
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
                        Add Sources
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {sources.map((source, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Source Name"
                                        variant="outlined"
                                        id="sourceName"
                                        name="sourceName"
                                        value={source.sourceName}
                                        onChange={handleSourceNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Source Description"
                                        variant="outlined"
                                        id="sourceDescription"
                                        name="sourceDescription"
                                        value={source.sourceDescription}
                                        onChange={handleSourceDescriptionChange(index)}
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
                                                onClick={handleAddSource}
                                            >
                                                Add Another Source
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveSource(index)}
                                            >
                                                Remove Source
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

export default AddSources

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