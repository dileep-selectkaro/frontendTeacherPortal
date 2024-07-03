import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, FormControl, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddItemCategories = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [itemCategories, setItemCategories] = useState([
        { itemCategoryName: "", itemCategoryDescription: "" }
    ]);

    const { status, currentToken, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const handleItemCategoryNameChange = (index) => (event) => {
        const newItemCategories = [...itemCategories];
        newItemCategories[index].itemCategoryName = event.target.value;
        setItemCategories(newItemCategories);
    };

    const handleItemCategoryDescriptionChange = (index) => (event) => {
        const newItemCategories = [...itemCategories];
        newItemCategories[index].itemCategoryDescription = event.target.value;
        setItemCategories(newItemCategories);
    };

    const handleAddItemCategory = () => {
        setItemCategories([...itemCategories, { itemCategoryName: "", itemCategoryDescription: "" }]);
    };

    const handleRemoveItemCategory = (index) => () => {
        const newItemCategories = [...itemCategories];
        newItemCategories.splice(index, 1);
        setItemCategories(newItemCategories);
    };

    const fields = {
        itemCategories,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("itemCategoryCreate", fields, currentToken))
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
                        Add Item Categories
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        {itemCategories.map((itemCategory, index) => (
                            <React.Fragment key={index}>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Item Category Name"
                                        variant="outlined"
                                        id="itemCategoryName"
                                        name="itemCategoryName"
                                        value={itemCategory.itemCategoryName}
                                        onChange={handleItemCategoryNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        rows={4}
                                        multiline
                                        label="Item Category Description"
                                        variant="outlined"
                                        id="itemCategoryDescription"
                                        name="itemCategoryDescription"
                                        value={itemCategory.itemCategoryDescription}
                                        onChange={handleItemCategoryDescriptionChange(index)}
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
                                                onClick={handleAddItemCategory}
                                            >
                                                Add Another Item Category
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveItemCategory(index)}
                                            >
                                                Remove Item Category
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

export default AddItemCategories

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