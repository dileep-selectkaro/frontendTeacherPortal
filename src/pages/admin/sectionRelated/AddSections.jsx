import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddSections = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sections, setSections] = useState([
        { sectionName: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleSectionNameChange = (index) => (event) => {
        const newSections = [...sections];
        newSections[index].sectionName = event.target.value;
        setSections(newSections);
    };

    const handleAddSection = () => {
        setSections([...sections, { sectionName: "" }]);
    };

    const handleRemoveSection = (index) => () => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
    };

    const fields = {
        sections,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("sectionCreate", fields, currentToken))
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
                        Add Sections
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {sections.map((section, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Section Name"
                                        variant="outlined"
                                        value={section.sectionName}
                                        onChange={handleSectionNameChange(index)}
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
                                                onClick={handleAddSection}
                                            >
                                                Add Another Section
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveSection(index)}
                                            >
                                                Remove Section
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

export default AddSections

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