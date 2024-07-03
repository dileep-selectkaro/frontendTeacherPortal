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
import { getItemStockList } from '../../../redux/userRelated/inventoryHandle';
import { formatDate } from '../../../utils/helperFunctions';

const ShowItemStocks = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, itemStockList, currentToken, loading,
        responseItemStockList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getItemStockList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [itemID, setItemID] = useState("");
    const [itemStockName, setItemStockName] = useState("");
    const [itemStockCode, setItemStockCode] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setItemID(row.id)
        setItemStockName(row.itemStockName)
        setItemStockCode(row.itemStockCode)
    };

    const fields = { itemStockName, itemStockCode }

    const editHandler = () => {
        if (itemStockName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (itemStockCode === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(itemID, fields, "updateItemStock", currentToken))
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
        dispatch(deletingFunction(itemID, "deleteItemStock", currentToken))
    }

    const itemColumns = [
        { id: 'itemName', label: 'Item', minWidth: 120 },
        { id: 'itemCategoryName', label: 'Category', minWidth: 120 },
        { id: 'supplierPerson', label: 'Supplier', minWidth: 120 },
        { id: 'itemStoreName', label: 'Store', minWidth: 100 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'purchasePrice', label: 'Purchase Price', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 },
    ];

    const itemRows = itemStockList.map((thing) => {
        return {
            itemName: thing?.item?.itemName,
            itemCategoryName: thing?.itemCategory?.itemCategoryName,
            supplierPerson: thing?.itemSupplier?.supplierPerson?.name,
            itemStoreName: thing?.itemStore?.itemStoreName,
            quantity: thing?.quantity,
            purchasePrice: thing?.purchasePrice,
            date: formatDate(thing?.date),
            id: thing?._id,
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
            icon: <PostAddIcon color="primary" />, name: 'Add Item Stock',
            action: () => navigate("/Admin/itemStocks/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getItemStockList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getItemStockList(currentToken))
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
                    {responseItemStockList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/itemStocks/add")}>
                                Add Item Stock
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(itemStockList) && itemStockList.length > 0 &&
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
                        id="itemStockName"
                        name="itemStockName"
                        label="Item Name"
                        value={itemStockName}
                        onChange={(event) => setItemStockName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemStockCode"
                        name="itemStockCode"
                        label="Item Unit"
                        value={itemStockCode}
                        onChange={(event) => setItemStockCode(event.target.value)}
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

export default ShowItemStocks;