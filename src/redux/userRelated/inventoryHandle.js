import axios from "axios";
import { userSliceActions } from "./userSlice";

export const getItemCategoryList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategoryList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getItemCategoryListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getItemCategoryListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getItemStoreList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemStoreList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getItemStoreListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getItemStoreListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getItemList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getItemListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getItemListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSpecificItemCategoryItemList = (itemCategory, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/specificItemCategoryItemList/${itemCategory}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSpecificItemCategoryItemListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSpecificItemCategoryItemListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getIssuedItemList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/issuedItemList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getIssuedItemListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getIssuedItemListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getItemSupplierList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemSupplierList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getItemSupplierListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getItemSupplierListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getItemStockList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemStockList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getItemStockListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getItemStockListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}