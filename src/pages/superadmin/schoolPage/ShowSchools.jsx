import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, Tooltip, IconButton, DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, PurpleButton } from '../../../components/buttonStyles';
import { getAllSchoolList } from '../../../redux/userRelated/superAdminHandle';
import { Close, Delete, DriveFileRenameOutline, PostAdd } from '@mui/icons-material';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { BootstrapDialog } from '../../../utils/styles';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { deletingFunction, loginDashboard, updatingFunction } from '../../../redux/userRelated/userHandle';
import ConfirmDelete from '../../../components/ConfirmDelete';

const ShowSchools = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        loading, status, error, response, currentRole,
        currentToken, schoolList, responseSchoolList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSchoolList());
    }, [dispatch]);

    const schoolColumns = [
        { id: 'schoolName', label: 'School Name', minWidth: 170 },
        { id: 'name', label: 'Admin', minWidth: 170 },
    ]

    const schoolRows = schoolList.map((school) => {
        return {
            schoolName: school.schoolName,
            name: school.name,
            data: school,
            id: school._id,
        };
    })

    const [schoolID, setSchoolID] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        schoolName: '',
        email: '',
        password: '',
    });

    const [open, setOpen] = useState(false);

    const handleClose = () => { setOpen(false) };

    const editPopupOpener = (row) => {
        setOpen(true);
        setSchoolID(row._id)
        setFormData({
            name: row.name,
            schoolName: row.schoolName,
            email: row.email,
            password: "",
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const fieldName = name === "adminName" ? "name" : name;

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const { password, ...formDataWithoutPassword } = formData;

    const editHandler = () => {

        if (!formData.name || !formData.schoolName || !formData.email) {
            dispatch(setPopupMessage("Please fill in all required fields."));
            return;
        }

        else if (formData.password === "") {
            dispatch(updatingFunction(schoolID, formDataWithoutPassword, "updateAdmin", currentToken))
        }
        else {
            dispatch(updatingFunction(schoolID, formData, "updateAdmin", currentToken))
        }
    };

    const [dialog, setDialog] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const deletePopupOpener = (id) => {
        setSchoolID(id)
        setDialog("Do you want to delete this school ?")
        setShowDialog(true)
    };

    const deleteHandler = () => {
        dispatch(deletingFunction(schoolID, "deleteAdmin", currentToken))
    }

    const loginHandler = (id) => {
        dispatch(loginDashboard(id, "loginAsAdmin", currentToken))
    }

    const SchoolsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => editPopupOpener(row?.data)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => deletePopupOpener(row?.id)} color="secondary">
                        <Delete color="error" />
                    </IconButton >
                </Tooltip>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/SuperAdmin/schools/school/${row?.schoolName}/${row?.id}`)}>
                    View Details
                </BlueButton>
                <PurpleButton variant="contained"
                    onClick={() => loginHandler(row?.id)}>
                    View Dashboard
                </PurpleButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAdd color="primary" />, name: 'Add New School',
            action: () => navigate(`/SuperAdmin/schools/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpen(false);
            dispatch(underControl())
            dispatch(getAllSchoolList());
        }
        else if (status === 'deleted') {
            setShowDialog(false);
            dispatch(underControl())
            dispatch(getAllSchoolList());
        }
        else if (status === 'adminLoggedIn' && currentToken !== null && currentRole === "AdminRoot") {
            navigate('/Admin/dashboard');
            dispatch(underControl())
        }
        else if (status === 'failed') {
            setOpen(false);
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            setOpen(false);
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, currentToken, currentRole, navigate, dispatch]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseSchoolList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            Sorry no schools right now
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(schoolList) && schoolList.length > 0 &&
                                <TableTemplate buttonHaver={SchoolsButtonHaver} columns={schoolColumns} rows={schoolRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            <BootstrapDialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit School
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="adminName"
                        name="adminName"
                        label="Change Admin's Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="schoolName"
                        name="schoolName"
                        label="Change School's Name"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        type="email"
                        label="Change Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        name="password"
                        label="Change Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editHandler}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <ConfirmDelete
                dialog={dialog}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                deleteHandler={deleteHandler}
            />
        </>
    );
};

export default ShowSchools;