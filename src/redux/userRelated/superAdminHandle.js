import axios from 'axios';
import {
    userSliceActions,
} from './userSlice';

export const fetchAllSchoolStats = () => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllSchoolStats`);
        if (result.data.message) {
            dispatch(userSliceActions.fetchAllSchoolStatsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.fetchAllSchoolStatsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const fetchSchoolStats = (id) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getSchoolStats/${id}`);
        if (result.data.message) {
            dispatch(userSliceActions.fetchSchoolStatsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.fetchSchoolStatsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const fetchSchoolStatsbyAdmin = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getSchoolStatsbyAdmin`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.fetchSchoolStatsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.fetchSchoolStatsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAllSchoolList = () => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Schools`);
        if (result.data.message) {
            dispatch(userSliceActions.getSchoolListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSchoolListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSchoolTeacherList = (id) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Teachers/${id}`);
        if (result.data.message) {
            dispatch(userSliceActions.getSchoolTeacherListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSchoolTeacherListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSchoolStudentList = (id) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Students/${id}`);
        if (result.data.message) {
            dispatch(userSliceActions.getSchoolStudentListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSchoolStudentListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}