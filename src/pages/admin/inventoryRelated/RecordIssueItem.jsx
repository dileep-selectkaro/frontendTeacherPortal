import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete,
    MenuItem,
    Select,
    InputLabel
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";
import { getUserListOne, getUserListTwo } from "../../../redux/userRelated/systemHandle";
import { getItemCategoryList, getSpecificItemCategoryItemList } from "../../../redux/userRelated/inventoryHandle";

const RecordIssueItem = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        userListOne, userListTwo, itemCategoryList,
        specificItemCategoryItemList
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [issuedToType, setIssuedToType] = useState('teacher');
    const [issuedTo, setIssuedTo] = useState('');

    const [issuedByType, setIssuedByType] = useState('teacher');
    const [issuedBy, setIssuedBy] = useState('');

    const [issuedDate, setIssuedDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [itemCategory, setItemCategory] = useState('');
    const [itemName, setItemName] = useState('');

    const [quantity, setQuantity] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        dispatch(getUserListOne(issuedToType, currentToken))
        dispatch(getUserListTwo(issuedByType, currentToken))
        dispatch(getItemCategoryList(currentToken))
    }, [issuedToType, issuedByType, currentToken, dispatch]);

    useEffect(() => {
        if (itemCategory) {
            dispatch(getSpecificItemCategoryItemList(itemCategory, currentToken))
        }
    }, [itemCategory, currentToken, dispatch]);

    const fields = {
        issuedTo,
        issuedToType,
        issuedBy,
        issuedByType,
        issuedDate,
        returnDate,
        note,
        itemCategory,
        item: itemName,
        quantity,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createIssueItem", fields, currentToken))
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
                        Issue Item
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="issuedToType">Issued To Type</InputLabel>
                            <Select
                                label='Issued To Type'
                                id="issuedToType"
                                name="issuedToType"
                                value={issuedToType}
                                onChange={(e) => setIssuedToType(e.target.value)}
                            >
                                <MenuItem value='admin'>Admin</MenuItem>
                                <MenuItem value='teacher'>Teacher</MenuItem>
                                {/* <MenuItem value='Accountant'>Accountant</MenuItem> */}
                                {/* <MenuItem value='Librarian'>Librarian</MenuItem> */}
                                {/* <MenuItem value='Receptionist'>Receptionist</MenuItem> */}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={userListOne || []}
                                getOptionLabel={(option) => (option?.name || '')}
                                value={userListOne?.find((item) => item?._id === issuedTo) || null}
                                onChange={(event, newValue) => {
                                    setIssuedTo(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Issued To"
                                        name="issuedTo"
                                        id="issuedTo"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="issuedByType">Issued To Type</InputLabel>
                            <Select
                                label='Issued To Type'
                                id="issuedByType"
                                name="issuedByType"
                                value={issuedByType}
                                onChange={(e) => setIssuedByType(e.target.value)}
                            >
                                <MenuItem value='admin'>Admin</MenuItem>
                                <MenuItem value='teacher'>Teacher</MenuItem>
                                {/* <MenuItem value='Accountant'>Accountant</MenuItem> */}
                                {/* <MenuItem value='Librarian'>Librarian</MenuItem> */}
                                {/* <MenuItem value='Receptionist'>Receptionist</MenuItem> */}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={userListTwo || []}
                                getOptionLabel={(option) => (option?.name || '')}
                                value={userListTwo?.find((item) => item?._id === issuedBy) || null}
                                onChange={(event, newValue) => {
                                    setIssuedBy(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Issued By"
                                        name="issuedBy"
                                        id="issuedBy"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Issued Date"
                                variant="outlined"
                                type="date"
                                name="issuedDate"
                                id="issuedDate"
                                value={issuedDate}
                                onChange={(e) => setIssuedDate(e.target.value)}
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
                                label="Return Date"
                                variant="outlined"
                                type="date"
                                name="returnDate"
                                id="returnDate"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                sx={styles.inputField}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={itemCategoryList || []}
                                getOptionLabel={(option) => (option?.itemCategoryName || '')}
                                value={itemCategoryList?.find((item) => item?._id === itemCategory) || null}
                                onChange={(event, newValue) => {
                                    setItemCategory(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Item Category"
                                        name="itemCategory"
                                        id="itemCategory"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={specificItemCategoryItemList || []}
                                getOptionLabel={(option) => (option?.itemName || '')}
                                value={specificItemCategoryItemList?.find((item) => item?._id === itemName) || null}
                                onChange={(event, newValue) => {
                                    setItemName(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Item"
                                        name="itemName"
                                        id="itemName"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Quantity"
                                variant="outlined"
                                name="quantity"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
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

export default RecordIssueItem

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