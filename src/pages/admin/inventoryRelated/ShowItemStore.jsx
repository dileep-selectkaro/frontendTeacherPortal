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
import { getItemStoreList } from '../../../redux/userRelated/inventoryHandle';

const ShowItemStore = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, itemStoreList, currentToken, loading,
        responseItemStoreList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getItemStoreList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [itemID, setItemID] = useState("");
    const [itemStoreName, setItemStoreName] = useState("");
    const [itemStoreCode, setItemStoreCode] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setItemID(row.id)
        setItemStoreName(row.itemStoreName)
        setItemStoreCode(row.itemStoreCode)
    };

    const fields = { itemStoreName, itemStoreCode }

    const editHandler = () => {
        if (itemStoreName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (itemStoreCode === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(itemID, fields, "updateItemStore", currentToken))
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
        dispatch(deletingFunction(itemID, "deleteItemStore", currentToken))
    }

    const itemColumns = [
        { id: 'itemStoreName', label: 'Item Store Name', minWidth: 120 },
        { id: 'itemStoreCode', label: 'Item Store Code', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 100 },
    ];

    const itemRows = itemStoreList.map((item) => {
        return {
            itemStoreName: item?.itemStoreName,
            itemStoreCode: item?.itemStoreCode,
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
            icon: <PostAddIcon color="primary" />, name: 'Add Item Store',
            action: () => navigate("/Admin/itemStore/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getItemStoreList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getItemStoreList(currentToken))
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
                    {responseItemStoreList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/itemStore/add")}>
                                Add Item Store
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(itemStoreList) && itemStoreList.length > 0 &&
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
                        id="itemStoreName"
                        name="itemStoreName"
                        label="Item Name"
                        value={itemStoreName}
                        onChange={(event) => setItemStoreName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemStoreCode"
                        name="itemStoreCode"
                        label="Item Unit"
                        value={itemStoreCode}
                        onChange={(event) => setItemStoreCode(event.target.value)}
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

export default ShowItemStore;