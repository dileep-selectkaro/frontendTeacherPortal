import axios from "axios";
import { userSliceActions } from "./userSlice";

export const getClassSubjectList = (classID) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/classSubjectList/${classID}`)
        if (result.data.message) {
            dispatch(userSliceActions.getClassSubjectListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getClassSubjectListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSubjectDetails = (subID) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/subjectDetails/${subID}`)
        if (result.data.message) {
            dispatch(userSliceActions.getSubjectDetailsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSubjectDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getClassSectionList = (classID) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/classSectionList/${classID}`)
        if (result.data.message) {
            dispatch(userSliceActions.getClassSectionListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getClassSectionListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getClassSectionStudentList = (classID, sectionID) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/sclassSectionStudentList/${classID}/${sectionID}`);
        if (result.data.message) {
            dispatch(userSliceActions.getClassSectionStudentListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getClassSectionStudentListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getSpecificSubjectGroupList = (classID, sectionID, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/specificSubjectGroupList/${classID}/${sectionID}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getSpecificSubjectGroupListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getSpecificSubjectGroupListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getHomeworkList = (classID, sectionID, subjectGroup, subject, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/homeworkList/${classID}/${sectionID}/${subjectGroup}/${subject}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getHomeworkListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getHomeworkListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getDailyAssignmentList = (classID, sectionID, subjectGroup, subject, date, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/dailyAssignmentList/${classID}/${sectionID}/${subjectGroup}/${subject}/${date}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getDailyAssignmentListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getDailyAssignmentListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}