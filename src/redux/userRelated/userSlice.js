import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/helperFunctions';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const generateYearsList = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year.toString());
    }
    return years;
};

const generateSessionYearsList = (startYear, endYear) => {
    const sessionYears = [];
    for (let year = startYear; year <= endYear; year++) {
        sessionYears.push(`${year}-${year + 1}`);
    }
    return sessionYears;
};

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getCurrentDay = () => {
    const today = new Date();
    const currentDayIndex = today.getDay();
    const currentDay = weekdays[currentDayIndex - 1];
    return currentDay;
};

const currentYear = new Date().getFullYear();

const getCurrentSessionYear = () => {
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear}`;
};

const activityDone = (state, status) => {
    state.status = status;
    state.response = null;
    state.error = null;
};

const fetchListSuccess = (state, action, listName) => {
    state[listName] = action.payload;
    state[`response${capitalizeFirstLetter(listName)}`] = null;
    state.loading = false;
    state.error = null;
};

const fetchListFailed = (state, action, listName) => {
    state[listName] = [];
    state[`response${capitalizeFirstLetter(listName)}`] = action.payload;
    state.loading = false;
    state.error = null;
};

const initialState = {
    status: 'idle',
    userDetails: [],
    tempDetails: [],
    loading: false,
    yearsList: generateYearsList(2000, 2050),
    sessionYearsList: generateSessionYearsList(2000, 2050),
    currentDate: formatDate(new Date()),
    currentYear: currentYear,
    currentSessionYear: getCurrentSessionYear(),
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    currentToken: (JSON.parse(localStorage.getItem('user')) || {}).token || null,
    rootID: (JSON.parse(localStorage.getItem('user')) || {}).rootID || null,
    error: null,
    response: null,
    fourSection: 'first',
    weekdays,
    currentDay: getCurrentDay(),

    showPopup: false,
    message: "",

    schoolList: [],
    responseSchoolList: null,

    schoolTeacherList: [],
    responseSchoolTeacherList: null,

    schoolStudentList: [],
    responseSchoolStudentList: null,

    schoolStats: [],
    responseSchoolStats: null,

    allschoolStats: [],
    responseAllschoolStats: null,

    sclassList: [],
    responseSclassList: null,

    subjectList: [],
    responseSubjectList: null,

    teacherList: [],
    responseTeacherList: null,

    allStudentList: [],
    responseAllStudentList: null,

    noticeList: [],
    responseNoticeList: null,

    classSubjectList: [],
    responseClassSubjectList: null,

    subjectDetails: [],
    responseSubjectDetails: null,

    classSectionList: [],
    responseClassSectionList: null,

    classRoutineList: [],
    responseClassRoutineList: null,

    teacherRoutineList: [],
    responseTeacherRoutineList: null,

    examGroupList: [],
    responseExamGroupList: null,

    examScheduleList: [],
    responseExamScheduleList: null,

    examinationList: [],
    responseExaminationList: null,

    allExaminationList: [],
    responseAllExaminationList: null,

    allAdmitCardList: [],
    responseAllAdmitCardList: null,

    admitCardExamScheduleList: [],
    responseAdmitCardExamScheduleList: null,

    admitCardPrintDetails: [],
    responseAdmitCardPrintDetails: null,

    sectionList: [],
    responseSectionList: null,

    subjectGroupList: [],
    responseSubjectGroupList: null,

    marksDivisionList: [],
    responseMarksDivisionList: null,

    marksGradeList: [],
    responseMarksGradeList: null,

    sclassSectionStudentList: [],
    responseSclassSectionStudentList: null,

    examResultList: [],
    responseExamResultList: null,

    assignedClassTeacherList: [],
    responseAssignedClassTeacherList: null,

    examStudentList: [],
    responseExamStudentList: null,

    examSubjectList: [],
    responseExamSubjectList: null,

    allMarkSheetList: [],
    responseAllMarkSheetList: null,

    markSheetPrintDetails: [],
    responseMarkSheetPrintDetails: null,

    studentExamDetails: [],
    responseStudentExamDetails: null,

    purposeList: [],
    responsePurposeList: null,

    complaintTypeList: [],
    responseComplaintTypeList: null,

    sourceList: [],
    responseSourceList: null,

    referenceList: [],
    responseReferenceList: null,

    visitorList: [],
    responseVisitorList: null,

    admissionEnquiryList: [],
    responseAdmissionEnquiryList: null,

    phoneCallLogList: [],
    responsePhoneCallLogList: null,

    itemCategoryList: [],
    responseItemCategoryList: null,

    itemList: [],
    responseItemList: null,

    examRankList: [],
    responseExamRankList: null,

    postalList: [],
    responsePostalList: null,

    userList: [],
    responseUserList: null,

    userListOne: [],
    responseUserListOne: null,

    userListTwo: [],
    responseUserListTwo: null,

    specificItemCategoryItemList: [],
    responseSpecificItemCategoryItemList: null,

    issuedItemList: [],
    responseIssuedItemList: null,

    itemStoreList: [],
    responseItemStoreList: null,

    itemSupplierList: [],
    responseItemSupplierList: null,

    itemStockList: [],
    responseItemStockList: null,

    hostelList: [],
    responseHostelList: null,

    roomTypeList: [],
    responseRoomTypeList: null,

    hostelRoomList: [],
    responseHostelRoomList: null,

    specificSubjectGroupList: [],
    responseSpecificSubjectGroupList: null,

    homeworkList: [],
    responseHomeworkList: null,

    dailyAssignmentList: [],
    responseDailyAssignmentList: null,

    studentHouseList: [],
    responseStudentHouseList: null,

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        getStudentHouseListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'studentHouseList');
        },
        getStudentHouseListFailed: (state, action) => {
            fetchListFailed(state, action, 'studentHouseList');
        },

        getDailyAssignmentListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'dailyAssignmentList');
        },
        getDailyAssignmentListFailed: (state, action) => {
            fetchListFailed(state, action, 'dailyAssignmentList');
        },

        getHomeworkListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'homeworkList');
        },
        getHomeworkListFailed: (state, action) => {
            fetchListFailed(state, action, 'homeworkList');
        },

        getSpecificSubjectGroupListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'specificSubjectGroupList');
        },
        getSpecificSubjectGroupListFailed: (state, action) => {
            fetchListFailed(state, action, 'specificSubjectGroupList');
        },

        getHostelRoomListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'hostelRoomList');
        },
        getHostelRoomListFailed: (state, action) => {
            fetchListFailed(state, action, 'hostelRoomList');
        },

        getRoomTypeListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'roomTypeList');
        },
        getRoomTypeListFailed: (state, action) => {
            fetchListFailed(state, action, 'roomTypeList');
        },

        getHostelListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'hostelList');
        },
        getHostelListFailed: (state, action) => {
            fetchListFailed(state, action, 'hostelList');
        },

        getItemStockListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'itemStockList');
        },
        getItemStockListFailed: (state, action) => {
            fetchListFailed(state, action, 'itemStockList');
        },

        getItemSupplierListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'itemSupplierList');
        },
        getItemSupplierListFailed: (state, action) => {
            fetchListFailed(state, action, 'itemSupplierList');
        },

        getItemStoreListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'itemStoreList');
        },
        getItemStoreListFailed: (state, action) => {
            fetchListFailed(state, action, 'itemStoreList');
        },

        getIssuedItemListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'issuedItemList');
        },
        getIssuedItemListFailed: (state, action) => {
            fetchListFailed(state, action, 'issuedItemList');
        },

        getSpecificItemCategoryItemListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'specificItemCategoryItemList');
        },
        getSpecificItemCategoryItemListFailed: (state, action) => {
            fetchListFailed(state, action, 'specificItemCategoryItemList');
        },

        getUserListTwoSuccess: (state, action) => {
            fetchListSuccess(state, action, 'userListTwo');
        },
        getUserListTwoFailed: (state, action) => {
            fetchListFailed(state, action, 'userListTwo');
        },

        getUserListOneSuccess: (state, action) => {
            fetchListSuccess(state, action, 'userListOne');
        },
        getUserListOneFailed: (state, action) => {
            fetchListFailed(state, action, 'userListOne');
        },

        getUserListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'userList');
        },
        getUserListFailed: (state, action) => {
            fetchListFailed(state, action, 'userList');
        },

        getPostalListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'postalList');
        },
        getPostalListFailed: (state, action) => {
            fetchListFailed(state, action, 'postalList');
        },

        getExamRankListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examRankList');
        },
        getExamRankListFailed: (state, action) => {
            fetchListFailed(state, action, 'examRankList');
        },

        getItemListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'itemList');
        },
        getItemListFailed: (state, action) => {
            fetchListFailed(state, action, 'itemList');
        },

        getItemCategoryListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'itemCategoryList');
        },
        getItemCategoryListFailed: (state, action) => {
            fetchListFailed(state, action, 'itemCategoryList');
        },

        getPhoneCallLogListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'phoneCallLogList');
        },
        getPhoneCallLogListFailed: (state, action) => {
            fetchListFailed(state, action, 'phoneCallLogList');
        },

        getAdmissionEnquiryListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'admissionEnquiryList');
        },
        getAdmissionEnquiryListFailed: (state, action) => {
            fetchListFailed(state, action, 'admissionEnquiryList');
        },

        getVisitorListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'visitorList');
        },
        getVisitorListFailed: (state, action) => {
            fetchListFailed(state, action, 'visitorList');
        },

        getReferenceListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'referenceList');
        },
        getReferenceListFailed: (state, action) => {
            fetchListFailed(state, action, 'referenceList');
        },

        getSourceListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'sourceList');
        },
        getSourceListFailed: (state, action) => {
            fetchListFailed(state, action, 'sourceList');
        },

        getComplaintTypeListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'complaintTypeList');
        },
        getComplaintTypeListFailed: (state, action) => {
            fetchListFailed(state, action, 'complaintTypeList');
        },

        getPurposeListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'purposeList');
        },
        getPurposeListFailed: (state, action) => {
            fetchListFailed(state, action, 'purposeList');
        },

        getStudentExamDetailsSuccess: (state, action) => {
            fetchListSuccess(state, action, 'studentExamDetails');
        },
        getStudentExamDetailsFailed: (state, action) => {
            fetchListFailed(state, action, 'studentExamDetails');
        },

        getMarkSheetPrintDetailsSuccess: (state, action) => {
            fetchListSuccess(state, action, 'markSheetPrintDetails');
        },
        getMarkSheetPrintDetailsFailed: (state, action) => {
            fetchListFailed(state, action, 'markSheetPrintDetails');
        },

        getAllMarkSheetListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'allMarkSheetList');
        },
        getAllMarkSheetListFailed: (state, action) => {
            fetchListFailed(state, action, 'allMarkSheetList');
        },

        getExamSubjectListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examSubjectList');
        },
        getExamSubjectListFailed: (state, action) => {
            fetchListFailed(state, action, 'examSubjectList');
        },

        getExamStudentListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examStudentList');
        },
        getExamStudentListFailed: (state, action) => {
            fetchListFailed(state, action, 'examStudentList');
        },

        getAssignedClassTeacherListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'assignedClassTeacherList');
        },
        getAssignedClassTeacherListFailed: (state, action) => {
            fetchListFailed(state, action, 'assignedClassTeacherList');
        },

        getExamResultListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examResultList');
        },
        getExamResultListFailed: (state, action) => {
            fetchListFailed(state, action, 'examResultList');
        },

        getClassSectionStudentListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'sclassSectionStudentList');
        },
        getClassSectionStudentListFailed: (state, action) => {
            fetchListFailed(state, action, 'sclassSectionStudentList');
        },

        getMarksGradeListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'marksGradeList');
        },
        getMarksGradeListFailed: (state, action) => {
            fetchListFailed(state, action, 'marksGradeList');
        },

        getMarksDivisionListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'marksDivisionList');
        },
        getMarksDivisionListFailed: (state, action) => {
            fetchListFailed(state, action, 'marksDivisionList');
        },

        getSubjectGroupListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'subjectGroupList');
        },
        getSubjectGroupListFailed: (state, action) => {
            fetchListFailed(state, action, 'subjectGroupList');
        },

        getSectionListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'sectionList');
        },
        getSectionListFailed: (state, action) => {
            fetchListFailed(state, action, 'sectionList');
        },

        getAdmitCardPrintDetailsSuccess: (state, action) => {
            fetchListSuccess(state, action, 'admitCardPrintDetails');
        },
        getAdmitCardPrintDetailsFailed: (state, action) => {
            fetchListFailed(state, action, 'admitCardPrintDetails');
        },

        getAdmitCardExamScheduleListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'admitCardExamScheduleList');
        },
        getAdmitCardExamScheduleListFailed: (state, action) => {
            fetchListFailed(state, action, 'admitCardExamScheduleList');
        },

        getAllAdmitCardListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'allAdmitCardList');
        },
        getAllAdmitCardListFailed: (state, action) => {
            fetchListFailed(state, action, 'allAdmitCardList');
        },

        getAllExaminationListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'allExaminationList');
        },
        getAllExaminationListFailed: (state, action) => {
            fetchListFailed(state, action, 'allExaminationList');
        },

        getExaminationListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examinationList');
        },
        getExaminationListFailed: (state, action) => {
            fetchListFailed(state, action, 'examinationList');
        },

        getExamScheduleListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examScheduleList');
        },
        getExamScheduleListFailed: (state, action) => {
            fetchListFailed(state, action, 'examScheduleList');
        },

        getExamGroupListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'examGroupList');
        },
        getExamGroupListFailed: (state, action) => {
            fetchListFailed(state, action, 'examGroupList');
        },

        getTeacherRoutineListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'teacherRoutineList');
        },
        getTeacherRoutineListFailed: (state, action) => {
            fetchListFailed(state, action, 'teacherRoutineList');
        },

        getClassRoutineListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'classRoutineList');
        },
        getClassRoutineListFailed: (state, action) => {
            fetchListFailed(state, action, 'classRoutineList');
        },

        getClassSectionListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'classSectionList');
        },
        getClassSectionListFailed: (state, action) => {
            fetchListFailed(state, action, 'classSectionList');
        },

        getSubjectDetailsSuccess: (state, action) => {
            fetchListSuccess(state, action, 'subjectDetails');
        },
        getSubjectDetailsFailed: (state, action) => {
            fetchListFailed(state, action, 'subjectDetails');
        },

        getClassSubjectListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'classSubjectList');
        },
        getClassSubjectListFailed: (state, action) => {
            fetchListFailed(state, action, 'classSubjectList');
        },

        getNoticeListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'noticeList');
        },
        getNoticeListFailed: (state, action) => {
            fetchListFailed(state, action, 'noticeList');
        },

        getStudentListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'allStudentList');
        },
        getStudentListFailed: (state, action) => {
            fetchListFailed(state, action, 'allStudentList');
        },

        getTeacherListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'teacherList');
        },
        getTeacherListFailed: (state, action) => {
            fetchListFailed(state, action, 'teacherList');
        },

        getSubjectListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'subjectList');
        },
        getSubjectListFailed: (state, action) => {
            fetchListFailed(state, action, 'subjectList');
        },

        getSclassListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'sclassList');
        },
        getSclassListFailed: (state, action) => {
            fetchListFailed(state, action, 'sclassList');
        },

        fetchAllSchoolStatsSuccess: (state, action) => {
            fetchListSuccess(state, action, 'allschoolStats');
        },
        fetchAllSchoolStatsFailed: (state, action) => {
            fetchListFailed(state, action, 'allschoolStats');
        },

        fetchSchoolStatsSuccess: (state, action) => {
            fetchListSuccess(state, action, 'schoolStats');
        },
        fetchSchoolStatsFailed: (state, action) => {
            fetchListFailed(state, action, 'schoolStats');
        },

        getSchoolStudentListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'schoolStudentList');
        },
        getSchoolStudentListFailed: (state, action) => {
            fetchListFailed(state, action, 'schoolStudentList');
        },

        getSchoolTeacherListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'schoolTeacherList');
        },
        getSchoolTeacherListFailed: (state, action) => {
            fetchListFailed(state, action, 'schoolTeacherList');
        },

        getSchoolListSuccess: (state, action) => {
            fetchListSuccess(state, action, 'schoolList');
        },
        getSchoolListFailed: (state, action) => {
            fetchListFailed(state, action, 'schoolList');
        },

        authRequest: (state) => {
            state.status = 'loading';
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        setFourSection: (state, action) => {
            state.fourSection = action.payload;
        },
        addingSucess: (state) => {
            activityDone(state, 'added');
        },
        updatingSucess: (state) => {
            activityDone(state, 'updated');
        },
        deletingSucess: (state) => {
            activityDone(state, 'deleted');
        },

        stuffAdded: (state, action) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload;
        },
        adminLoginDashboardSuccess: (state, action) => {
            if (state.status === 'loggedOut') {
                state.status = 'adminLoggedIn';
                state.currentUser = action.payload;
                state.currentRole = action.payload.role;
                state.currentToken = action.payload.token;
                state.rootID = action.payload.rootID;
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.response = null;
                state.error = null;
            }
        },
        superAdminLoginDashboardSuccess: (state, action) => {
            if (state.status === 'loggedOut') {
                state.status = 'superAdminLoggedIn';
                state.currentUser = action.payload;
                state.currentRole = action.payload.role;
                state.currentToken = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.response = null;
                state.error = null;
            }
        },
        authSuccess: (state, action) => {
            state.status = 'success';
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            state.currentToken = action.payload.token;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.response = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
            state.error = null;
        },
        authError: (state, action) => {
            state.status = 'error';
            state.response = null;
            state.error = action.payload;
        },
        authLogout: (state) => {
            localStorage.removeItem('user');
            state.currentUser = null;
            state.status = 'loggedOut';
            state.error = null;
            state.currentRole = null
            state.currentToken = null;
            state.rootID = null;
        },

        doneSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getDeleteSuccess: (state) => {
            state.status = 'deleted';
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        getRequest: (state) => {
            state.loading = true;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        setCurrentDay: (state, action) => {
            state.currentDay = action.payload;
        },

        setPopupMessage: (state, action) => {
            state.message = action.payload;
            state.showPopup = true;
        },
        closePopup: (state) => {
            state.showPopup = false;
            state.message = "";
        },
    },
});


export const {

    underControl,
    authLogout,

    setPopupMessage,
    closePopup,

    setCurrentDay,
    setFourSection,

} = userSlice.actions;

export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;