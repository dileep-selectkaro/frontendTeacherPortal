import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";
import { getItemCategoryList } from "../../../redux/userRelated/inventoryHandle";

const AddItem = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        itemCategoryList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getItemCategoryList(currentToken))
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [description, setDescription] = useState('');

    const fields = {
        itemName,
        itemCategory,
        itemUnit,
        description,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("itemCreate", fields, currentToken))
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
                        Add Item
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Item Name"
                                variant="outlined"
                                name="itemName"
                                id="itemName"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                sx={styles.inputField}
                                required
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
                            <TextField
                                fullWidth
                                label="Item Unit"
                                variant="outlined"
                                name="itemUnit"
                                id="itemUnit"
                                value={itemUnit}
                                onChange={(e) => setItemUnit(e.target.value)}
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

export default AddItem

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