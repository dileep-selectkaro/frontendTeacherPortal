import axios from "axios";
import { userSliceActions } from "./userSlice";

export const getPurposeList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/purposeList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getPurposeListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getPurposeListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getComplaintTypeList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/complaintTypeList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getComplaintTypeListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getComplaintTypeListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSourceList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/sourceList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSourceListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSourceListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getReferenceList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/referenceList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getReferenceListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getReferenceListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getVisitorList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/visitorList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getVisitorListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getVisitorListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAdmissionEnquiryList = (sclass, source, admissionEnquiryStatus, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/admissionEnquiryList/${sclass}/${source}/${admissionEnquiryStatus}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAdmissionEnquiryListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAdmissionEnquiryListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getPhoneCallLogList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/phoneCallLogList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getPhoneCallLogListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getPhoneCallLogListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getPostalList = (token, postalType) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/postalList/${postalType}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getPostalListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getPostalListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}