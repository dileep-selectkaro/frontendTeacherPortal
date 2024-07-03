import axios from "axios";
import { userSliceActions } from "./userSlice";

export const getSclassList = (token, address) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSclassListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSclassListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSubjectList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/subjectList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSubjectListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSubjectListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getTeacherList = (token, address) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getTeacherListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getTeacherListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getStudentList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/allStudentList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getStudentListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getStudentListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getNoticeList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/noticeList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getNoticeListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getNoticeListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSectionList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/sectionList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSectionListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSectionListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSubjectGroupList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/subjectGroupList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSubjectGroupListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSubjectGroupListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getStudentHouseList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/studentHouseList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getStudentHouseListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getStudentHouseListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAssignedClassTeacherList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/assignedClassTeacherList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAssignedClassTeacherListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAssignedClassTeacherListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getUserList = (userType, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/get${userType}Lists`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getUserListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getUserListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getUserListOne = (userType, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/get${userType}Lists`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getUserListOneFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getUserListOneSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getUserListTwo = (userType, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/get${userType}Lists`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getUserListTwoFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getUserListTwoSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}