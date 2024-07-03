import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Paper, Box, IconButton } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getTeacherList } from '../../../redux/userRelated/systemHandle';
import { underControl } from '../../../redux/userRelated/userSlice';

const ShowTeachers = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        currentUser, currentToken, status,
        teacherList, loading, responseTeacherList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getTeacherList(currentToken, "allTeacherList"));
    }, [currentToken, dispatch]);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
    }

    const teacherColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 },
    ]

    const teacherRows = teacherList && teacherList.length > 0 && teacherList.map((teacher) => {

        return {
            name: teacher?.name,
            email: teacher.email,
            id: teacher._id,
        };
    })

    const TeacherButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/add")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];


    useEffect(() => {
        if (status === 'deleted') {
            dispatch(getTeacherList(currentToken, "allTeacherList"));
            dispatch(underControl())
        }
    }, [status, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseTeacherList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/add")}>
                                Add Teachers
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(teacherList) && teacherList.length > 0 &&
                                <TableTemplate buttonHaver={TeacherButtonHaver} columns={teacherColumns} rows={teacherRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
        </>
    );
};

export default ShowTeachers;