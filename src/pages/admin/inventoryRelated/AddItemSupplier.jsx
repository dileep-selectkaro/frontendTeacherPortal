import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton } from "../../../components/buttonStyles";

const AddItemSupplier = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, error,
    } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({

        supplierPerson: {
            name: "",
            phone: '',
            email: '',
        },

        address: '',

        contactPerson: {
            name: "",
            phone: '',
            email: '',
        },

        description: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        dispatch(addingFunction("createItemSupplier", formData, currentToken))
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
                        Add Item Supplier
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Supplier Person Name"
                                name="supplierPerson.name"
                                value={formData.supplierPerson.name}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type='number'
                                label="Supplier Person Phone"
                                name="supplierPerson.phone"
                                value={formData.supplierPerson.phone}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Supplier Person Email"
                                type="email"
                                name="supplierPerson.email"
                                value={formData.supplierPerson.email}
                                onChange={handleInputChange}
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
                                value={formData.address}
                                onChange={handleInputChange}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Contact Person Name"
                                name="contactPerson.name"
                                value={formData.contactPerson.name}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                type='number'
                                label="Contact Person Phone"
                                name="contactPerson.phone"
                                value={formData.contactPerson.phone}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Contact Person Email"
                                type="email"
                                name="contactPerson.email"
                                value={formData.contactPerson.email}
                                onChange={handleInputChange}
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
                                value={formData.description}
                                onChange={handleInputChange}
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

export default AddItemSupplier

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