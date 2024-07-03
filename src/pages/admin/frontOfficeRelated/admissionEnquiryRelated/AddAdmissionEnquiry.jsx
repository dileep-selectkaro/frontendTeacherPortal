import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../../components/buttonStyles";
import { getSourceList, getReferenceList } from "../../../../redux/userRelated/frontOfficeHandle";
import { getSclassList, getTeacherList } from "../../../../redux/userRelated/systemHandle";

const AddAdmissionEnquiry = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        sourceList, referenceList, sclassList, teacherList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSourceList(currentToken))
        dispatch(getReferenceList(currentToken))
        dispatch(getSclassList(currentToken, "allSclassList"));
        dispatch(getTeacherList(currentToken, "allTeacherList"));
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [providedName, setProvidedName] = useState('');
    const [source, setSource] = useState('');
    const [sclass, setSclass] = useState('');
    const [assigned, setAssigned] = useState('');
    const [reference, setReference] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [numberOfChild, setNumberOfChild] = useState('');
    const [date, setDate] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [description, setDescription] = useState('');

    const fields = {
        providedName,
        phone,
        email,
        date,
        followUpDate,
        assigned,
        reference,
        source,
        sclass,
        numberOfChild,
        address,
        description,
        note,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createAdmissionEnquiry", fields, currentToken))
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
                        Admission Enquiry
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                name="providedName"
                                id="providedName"
                                value={providedName}
                                onChange={(e) => setProvidedName(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                label="Phone"
                                variant="outlined"
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
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
                                type="date"
                                label="Next Follow Up Date"
                                variant="outlined"
                                name="followUpDate"
                                id="followUpDate"
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                                sx={styles.inputField}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={teacherList || []}
                                getOptionLabel={(option) => (option?.name || '')}
                                value={teacherList?.find((item) => item?._id === assigned) || null}
                                onChange={(event, newValue) => {
                                    setAssigned(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Assigned"
                                        name="assigned"
                                        id="assigned"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={referenceList || []}
                                getOptionLabel={(option) => (option?.referenceName || '')}
                                value={referenceList?.find((item) => item?._id === reference) || null}
                                onChange={(event, newValue) => {
                                    setReference(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Reference"
                                        name="reference"
                                        id="reference"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={sourceList || []}
                                getOptionLabel={(option) => (option?.sourceName || '')}
                                value={sourceList?.find((item) => item?._id === source) || null}
                                onChange={(event, newValue) => {
                                    setSource(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Source"
                                        name="source"
                                        id="source"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={sclassList || []}
                                getOptionLabel={(option) => (option?.sclassName || '')}
                                value={sclassList?.find((item) => item?._id === sclass) || null}
                                onChange={(event, newValue) => {
                                    setSclass(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Class"
                                        name="sclass"
                                        id="sclass"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type="number"
                                label="Number of Child"
                                variant="outlined"
                                name="numberOfChild"
                                id="numberOfChild"
                                value={numberOfChild}
                                onChange={(e) => setNumberOfChild(e.target.value)}
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

export default AddAdmissionEnquiry

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