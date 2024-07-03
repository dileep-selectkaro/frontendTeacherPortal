import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton, RedButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { deletingFunction, updatingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import ConfirmDelete from '../../../components/ConfirmDelete';
import { getIssuedItemList } from '../../../redux/userRelated/inventoryHandle';
import { formatDate, formatNameObj } from '../../../utils/helperFunctions';

const ShowIssuedItems = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, issuedItemList, currentToken, loading,
        responseIssuedItemList, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getIssuedItemList(currentToken))
    }, [currentToken, dispatch]);

    const [itemID, setItemID] = useState("");

    const editHandler = (itemid) => {
        const fields = { itemStatus: "Returned" }

        dispatch(updatingFunction(itemid, fields, "updateIssueItem", currentToken))
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setItemID(id)
        setDialog("Do you want to delete this item ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(itemID, "deleteIssueItem", currentToken))
    }

    const itemColumns = [
        { id: 'itemName', label: 'Item', minWidth: 120 },
        { id: 'note', label: 'Note', minWidth: 100 },
        { id: 'itemCategoryName', label: 'Item Category', minWidth: 100 },
        { id: 'issueReturnDate', label: 'Issue - Return', minWidth: 100 },
        { id: 'issuedToName', label: 'Issued To', minWidth: 100 },
        { id: 'issuedByName', label: 'Issued By', minWidth: 100 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'itemStatus', label: 'Status', minWidth: 100 },
    ];

    const itemRows = issuedItemList.map((thing) => {
        let issuedByName;
        if (typeof thing.issuedBy?.name) {
            issuedByName = thing?.issuedBy?.name;
        } else {
            issuedByName = formatNameObj(thing.issuedBy?.teacherName);
        }

        let issuedToName;
        if (thing.issuedTo?.name) {
            issuedToName = thing?.issuedTo?.name;
        } else {
            issuedToName = formatNameObj(thing.issuedTo?.teacherName);
        }

        return {
            note: thing?.note,
            quantity: thing?.quantity,
            itemStatus: thing?.itemStatus === "Issued" ?
                <RedButton onClick={() => editHandler(thing?._id)}>Click To Return</RedButton>
                :
                <GreenButton>Returned</GreenButton>,

            issueReturnDate: `${formatDate(thing?.issuedDate)} - ${formatDate(thing?.returnDate)}`,

            issuedToName: issuedToName,
            issuedToID: thing?.issuedTo?._id,

            issuedByName: issuedByName,
            issuedByID: thing?.issuedBy?._id,

            itemCategoryName: thing?.itemCategory?.itemCategoryName,
            itemCategoryID: thing?.itemCategory?._id,

            itemName: thing?.item?.itemName,
            itemID: thing?.item?._id,

            description: thing?.description,
            id: thing?._id,
        };
    });

    const ItemsButtonHaver = ({ row }) => {
        return (
            <>
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
            icon: <PostAddIcon color="primary" />, name: 'Issue Item',
            action: () => navigate("/Admin/issuedItems/add")
        }
    ];

    useEffect(() => {
        if (status === 'updated') {
            dispatch(getIssuedItemList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(getIssuedItemList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
            dispatch(underControl())
        }
        else if (status === 'error') {
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
                    {responseIssuedItemList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/issuedItems/add")}>
                                Issue Items
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(issuedItemList) && issuedItemList.length > 0 &&
                                <TableTemplate buttonHaver={ItemsButtonHaver} columns={itemColumns} rows={itemRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }

            <ConfirmDelete
                dialog={dialog}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                deleteHandler={deleteHandler}
            />
        </>
    );
};

export default ShowIssuedItems;