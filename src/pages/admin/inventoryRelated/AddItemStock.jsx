import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";
import { getItemCategoryList, getItemStoreList, getItemSupplierList, getSpecificItemCategoryItemList } from "../../../redux/userRelated/inventoryHandle";

const AddItemStock = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
        itemCategoryList, specificItemCategoryItemList,
        itemSupplierList, itemStoreList
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [itemCategory, setItemCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemSupplier, setItemSupplier] = useState('');
    const [itemStore, setItemStore] = useState('');

    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getItemCategoryList(currentToken))
        dispatch(getItemSupplierList(currentToken))
        dispatch(getItemStoreList(currentToken))
    }, [currentToken, dispatch]);

    useEffect(() => {
        if (itemCategory) {
            dispatch(getSpecificItemCategoryItemList(itemCategory, currentToken))
        }
    }, [itemCategory, currentToken, dispatch]);

    const fields = {
        itemCategory,
        item: itemName,
        itemSupplier,
        itemStore,
        quantity,
        purchasePrice,
        date,
        description,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createItemStock", fields, currentToken))
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
                        Add Item Stock
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
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
                            <Autocomplete
                                options={itemSupplierList || []}
                                getOptionLabel={(option) => (option?.supplierPerson?.name || '')}
                                value={itemSupplierList?.find((item) => item?._id === itemSupplier) || null}
                                onChange={(event, newValue) => {
                                    setItemSupplier(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Item Supplier"
                                        name="itemSupplier"
                                        id="itemSupplier"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={itemStoreList || []}
                                getOptionLabel={(option) => (option?.itemStoreName || '')}
                                value={itemStoreList?.find((item) => item?._id === itemStore) || null}
                                onChange={(event, newValue) => {
                                    setItemStore(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Select Store"
                                        name="itemStore"
                                        id="itemStore"
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
                                label="Purchase Price"
                                variant="outlined"
                                name="purchasePrice"
                                id="purchasePrice"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Date"
                                variant="outlined"
                                type="date"
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

export default AddItemStock

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