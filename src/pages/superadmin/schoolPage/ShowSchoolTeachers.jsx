import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {
    Paper, Box
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton } from '../../../components/buttonStyles';
import { getSchoolTeacherList } from '../../../redux/userRelated/superAdminHandle';

const ShowSchoolTeachers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error, schoolTeacherList, responseSchoolTeacherList } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSchoolTeacherList(id));
    }, [dispatch, id]);

    if (error) {
        console.log(error);
    }

    const teacherColumns = [
        { id: 'name', label: 'Teacher Name', minWidth: 170 },
        { id: 'schoolName', label: 'School', minWidth: 170 },
    ]

    const teacherRows = schoolTeacherList.map((teacher) => {
        return {
            schoolName: teacher?.school?.schoolName,
            name: teacher?.name,
            id: teacher._id,
        };
    })

    const TeachersButtonHaver = ({ row }) => {
        return (
            <>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/SuperAdmin/teachers/teacher/${row.id}`)}>
                    View
                </BlueButton>
            </>
        );
    };

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseSchoolTeacherList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            Sorry no teachers right now
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(schoolTeacherList) && schoolTeacherList.length > 0 &&
                                <TableTemplate buttonHaver={TeachersButtonHaver} columns={teacherColumns} rows={teacherRows} />
                            }
                        </Paper>
                    }
                </>
            }

        </>
    );
};

export default ShowSchoolTeachers;