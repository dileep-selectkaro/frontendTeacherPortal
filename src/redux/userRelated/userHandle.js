import axios from 'axios';
import {
    userSliceActions,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(userSliceActions.authSuccess(result.data));
        } else {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(userSliceActions.authSuccess(result.data));
        }
        else if (result.data.school) {
            dispatch(userSliceActions.stuffAdded());
        }
        else {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
};

export const registerOther = (fields, role) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
        else {
            dispatch(userSliceActions.authSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(userSliceActions.authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(userSliceActions.doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(userSliceActions.getFailed(result.data.message));
        } else {
            dispatch(userSliceActions.getDeleteSuccess());
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(userSliceActions.getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(userSliceActions.authSuccess(result.data));
        }
        else {
            dispatch(userSliceActions.doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(userSliceActions.authFailed(result.data.message));
        } else {
            dispatch(userSliceActions.stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
};


export const addingFunction = (address, fields, token) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}`, fields, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
        else {
            dispatch(userSliceActions.addingSucess());
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
};

export const updatingFunction = (id, fields, address, token) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { Authorization: token },
        });
        if (result.status === 200) {
            dispatch(userSliceActions.updatingSucess());
        }
        else if (result.data.message) {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
}

export const deletingFunction = (id, address, token) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, {
            headers: { Authorization: token },
        });
        if (result.status === 200) {
            dispatch(userSliceActions.deletingSucess());
        }
        else if (result.data.message) {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
}

export const loginDashboard = (id, address, token) => async (dispatch) => {
    dispatch(userSliceActions.authRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, {
            headers: { Authorization: token },
        });
        if (result.status === 200 && result.data.role === "AdminRoot") {
            dispatch(userSliceActions.authLogout());
            dispatch(userSliceActions.adminLoginDashboardSuccess(result.data));
        }
        else if (result.status === 200 && result.data.role === "SuperAdmin") {
            dispatch(userSliceActions.authLogout());
            dispatch(userSliceActions.superAdminLoginDashboardSuccess(result.data));
        }
        else if (result.data.message) {
            dispatch(userSliceActions.authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(userSliceActions.authError(error));
    }
}