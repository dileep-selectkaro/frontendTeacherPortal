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
import { getItemCategoryList } from '../../../redux/userRelated/inventoryHandle';

const ShowItemCategories = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, itemCategoryList, currentToken, loading,
        responseItemCategoryList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getItemCategoryList(currentToken))
    }, [currentToken, dispatch]);

    const [open, setOpen] = useState(false);
    const [itemCategoryID, setItemCategoryID] = useState("");
    const [itemCategoryName, setItemCategoryName] = useState("");
    const [itemCategoryDescription, setItemCategoryDescription] = useState("");

    const handleClose = () => { setOpen(false) };

    const dialogOpener = (row) => {
        setOpen(true);
        setItemCategoryID(row.id)
        setItemCategoryName(row.itemCategoryName)
        setItemCategoryDescription(row.itemCategoryDescription)
    };

    const fields = { itemCategoryName, itemCategoryDescription }

    const editHandler = () => {
        if (itemCategoryName === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else if (itemCategoryDescription === "") {
            dispatch(setPopupMessage("All fields are required"))
        }
        else {
            dispatch(updatingFunction(itemCategoryID, fields, "itemCategoryUpdate", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setItemCategoryID(id)
        setDialog("Do you want to delete this item category ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(itemCategoryID, "itemCategoryDelete", currentToken))
    }

    const itemCategoryColumns = [
        { id: 'itemCategoryName', label: 'Item Category', minWidth: 170 },
        { id: 'itemCategoryDescription', label: 'Description', minWidth: 170 },
    ]

    const itemCategoryRows = Array.isArray(itemCategoryList) && itemCategoryList.length > 0 && itemCategoryList.map((itemCategory) => {
        return {
            itemCategoryName: itemCategory?.itemCategoryName,
            itemCategoryDescription: itemCategory?.itemCategoryDescription,
            id: itemCategory?._id,
        };
    })

    const ItemCategoriesButtonHaver = ({ row }) => {
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
            icon: <PostAddIcon color="primary" />, name: 'Add New Item Category',
            action: () => navigate("/Admin/itemCategories/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(getItemCategoryList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getItemCategoryList(currentToken))
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
                    {responseItemCategoryList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/itemCategories/add")}>
                                Add Item Categories
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(itemCategoryList) && itemCategoryList.length > 0 &&
                                <TableTemplate buttonHaver={ItemCategoriesButtonHaver} columns={itemCategoryColumns} rows={itemCategoryRows} />
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
                    Edit Item Category
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
                        id="itemCategoryName"
                        name="itemCategoryName"
                        label="Item Category Name"
                        value={itemCategoryName}
                        onChange={(event) => setItemCategoryName(event.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        rows={4}
                        multiline
                        margin="dense"
                        id="itemCategoryDescription"
                        name="itemCategoryDescription"
                        label="Item Category Name"
                        value={itemCategoryDescription}
                        onChange={(event) => setItemCategoryDescription(event.target.value)}
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

export default ShowItemCategories;