import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {
    Paper, Box
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton } from '../../../components/buttonStyles';
import { getSchoolStudentList } from '../../../redux/userRelated/superAdminHandle';

const ShowSchoolStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error, schoolStudentList, responseSchoolStudentList } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSchoolStudentList(id));
    }, [dispatch, id]);

    if (error) {
        console.log(error);
    }

    const studentColumns = [
        { id: 'name', label: 'Student Name', minWidth: 170 },
        { id: 'schoolName', label: 'School', minWidth: 170 },
    ]

    const studentRows = schoolStudentList.map((student) => {
        return {
            schoolName: student?.school?.schoolName,
            name: student?.name,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/SuperAdmin/students/student/${row.id}`)}>
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
                    {responseSchoolStudentList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            Sorry no students right now
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(schoolStudentList) && schoolStudentList.length > 0 &&
                                <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                        </Paper>
                    }
                </>
            }

        </>
    );
};

export default ShowSchoolStudents;