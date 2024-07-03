import axios from "axios";
import { userSliceActions } from "./userSlice";

export const getExamGroupList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examGroupList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExamGroupListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExamGroupListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getExamScheduleList = (examGroup, token, examinationType) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examScheduleList/${examGroup}/${examinationType}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExamScheduleListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExamScheduleListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getExamSubjectList = (examGroup, token, examinationType) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examSubjectList/${examGroup}/${examinationType}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExamSubjectListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExamSubjectListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getExamStudentList = (sclassName, sectionName, sessionYear, token, examinationType) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examStudentList/${sclassName}/${sectionName}/${sessionYear}/${examinationType}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExamStudentListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExamStudentListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getExamResultList = (examGroup, examinationType, classID, sectionID, sessionYear, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examResultList/${examGroup}/${examinationType}/${classID}/${sectionID}/${sessionYear}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExamResultListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExamResultListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getExamRankList = (examGroup, examinationType, sessionYear, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examRankList/${examGroup}/${examinationType}/${sessionYear}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExamRankListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExamRankListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getMarkSheetPrintDetails = (token, studentID, acID) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/markSheetPrintDetails/${studentID}/${acID}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getMarkSheetPrintDetailsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getMarkSheetPrintDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getStudentExamDetails = (token, studentID, examinationID, sessionYear) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/studentExamDetails/${studentID}/${examinationID}/${sessionYear}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getStudentExamDetailsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getStudentExamDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getMarksGradeList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/marksGradeList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getMarksGradeListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getMarksGradeListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAdmitCardExamScheduleList = (token, examinationType) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/admitCardExamScheduleList/${examinationType}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAdmitCardExamScheduleListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAdmitCardExamScheduleListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getExaminationList = (examGroup, token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/examinationList/${examGroup}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getExaminationListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getExaminationListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAllExaminationList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/allExaminationList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAllExaminationListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAllExaminationListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getMarksDivisionList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/marksDivisionList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getMarksDivisionListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getMarksDivisionListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAllMarkSheetList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/allMarkSheetList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAllMarkSheetListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAllMarkSheetListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAllAdmitCardList = (token) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/allAdmitCardList`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAllAdmitCardListFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAllAdmitCardListSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const getAdmitCardPrintDetails = (token, studentID, acID) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/admitCardPrintDetails/${studentID}/${acID}`, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.getAdmitCardPrintDetailsFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getAdmitCardPrintDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}