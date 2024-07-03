import axios from "axios";
import { userSliceActions } from "./userSlice";

export const getClassRoutineList = (sclass, token, section) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/classRoutineList/${sclass}/${section}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getClassRoutineListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getClassRoutineListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getTeacherRoutineList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/teacherRoutineList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getTeacherRoutineListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getTeacherRoutineListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getTeacherRoutineListbyAdmin = (id, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/teacherRoutineListbyAdmin/${id}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getTeacherRoutineListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getTeacherRoutineListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}