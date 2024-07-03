import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip,
    DialogTitle, DialogContent, TextField,
    DialogActions, Button
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { deletingFunction, updatingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { Close, DriveFileRenameOutline } from '@mui/icons-material';
import { BootstrapDialog } from '../../../utils/styles';
import ConfirmDelete from '../../../components/ConfirmDelete';
import { getItemSupplierList } from '../../../redux/userRelated/inventoryHandle';

const ShowItemSuppliers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, itemSupplierList, currentToken, loading,
        responseItemSupplierList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getItemSupplierList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [itemID, setItemID] = useState("");
    const [itemSupplierName, setItemSupplierName] = useState("");
    const [itemSupplierCode, setItemSupplierCode] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setItemID(row.id)
        setItemSupplierName(row.itemSupplierName)
        setItemSupplierCode(row.itemSupplierCode)
    };

    const fields = { itemSupplierName, itemSupplierCode }

    const editHandler = () => {
        if (itemSupplierName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (itemSupplierCode === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(itemID, fields, "updateItemSupplier", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setItemID(id)
        setDialog("Do you want to delete this item ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(itemID, "deleteItemSupplier", currentToken))
    }

    const itemColumns = [
        { id: 'supplierPersonDetails', label: 'Item Supplier', minWidth: 120 },
        { id: 'contactPersonDetails', label: 'Contact Person', minWidth: 100 },
        { id: 'address', label: 'Address', minWidth: 100 },
    ];

    const itemRows = itemSupplierList.map((item) => {
        const supplierPersonDetails = `${item?.supplierPerson?.name}, ${item?.supplierPerson?.phone}, ${item?.supplierPerson?.email}`
        const contactPersonDetails = `${item?.contactPerson?.name}, ${item?.contactPerson?.phone}, ${item?.contactPerson?.email}`

        return {
            supplierPersonDetails: supplierPersonDetails,
            contactPersonDetails: contactPersonDetails,
            address: item?.address,
            description: item?.description,
            id: item?._id,
        };
    });

    const ItemsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deletePopupOpener(row.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add Item Supplier',
            action: () => navigate("/Admin/itemSuppliers/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getItemSupplierList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getItemSupplierList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            setOpen(false);
            dispatch(setPopupMessage(response))
            dispatch(underControl())
        }
        else if (status === 'error') {
            setOpen(false);
            dispatch(setPopupMessage("Network Error"))
            dispatch(underControl())
        }
    }, [status, error, response, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseItemSupplierList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/itemSuppliers/add")}>
                                Add Item Supplier
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(itemSupplierList) && itemSupplierList.length > 0 &&
                                <TableTemplate buttonHaver={ItemsButtonHaver} columns={itemColumns} rows={itemRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <BootstrapDialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Item
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemSupplierName"
                        name="itemSupplierName"
                        label="Item Name"
                        value={itemSupplierName}
                        onChange={(event) => setItemSupplierName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemSupplierCode"
                        name="itemSupplierCode"
                        label="Item Unit"
                        value={itemSupplierCode}
                        onChange={(event) => setItemSupplierCode(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editHandler}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <ConfirmDelete
                dialog={dialog}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                deleteHandler={deleteHandler}
            />
        </>
    );
};

export default ShowItemSuppliers;