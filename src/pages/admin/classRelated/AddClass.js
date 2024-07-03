import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, CircularProgress, FormControl, Stack, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import { getSectionList } from "../../../redux/userRelated/systemHandle";

const AddClass = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, response, error,
        currentToken, sectionList
    } = useSelector(state => state.user);
    
    useEffect(() => {
        dispatch(getSectionList(currentToken))
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [sclassName, setSclassName] = useState("");
    const [sections, setSections] = useState([]);

    const fields = {
        sclassName,
        sections
    };

    const submitHandler = (event) => {
        event.preventDefault()

        setLoader(true)
        dispatch(addingFunction("sclassCreate", fields, currentToken))
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
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="Class Name"
                                variant="outlined"
                                value={sclassName}
                                name="sclassName"
                                id="sclassName"
                                onChange={(event) => {
                                    setSclassName(event.target.value);
                                }}
                                required
                            />
                            <FormControl>
                                <Autocomplete
                                    multiple
                                    id="sections"
                                    options={sectionList}
                                    getOptionLabel={(option) => option.sectionName || ''}
                                    value={sections}
                                    onChange={(event, newValue) => setSections(newValue)}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Sections" />
                                    )}
                                    filterSelectedOptions
                                    required
                                    isOptionEqualToValue={(option, value) => option._id === value._id}
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
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                            </BlueButton>
                            <Button variant="outlined" onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
        </>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;
