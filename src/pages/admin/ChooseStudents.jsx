import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BlueButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';
import { getStudentList } from '../../redux/userRelated/systemHandle';

const ChooseStudents = ({ path, type }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { acID, examinationID } = useParams();

    const {
        loading, currentToken, allStudentList, responseAllStudentList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getStudentList(currentToken));
    }, [currentToken, dispatch]);

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = allStudentList && allStudentList.length > 0 && allStudentList.map((student) => {

        return {
            name: student?.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    })

    const StudentButtonHaver = ({ row }) => {

        return (
            <>
                {
                    type === "choose" ?
                        <BlueButton variant="contained"
                            onClick={() => navigate(`${path}/${row.id}/${acID}/${examinationID}`)}>
                            Select
                        </BlueButton>
                        :
                        <BlueButton variant="contained"
                            onClick={() => navigate(`${path}/${row.id}`)}>
                            View
                        </BlueButton>
                }
            </>
        );
    };

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseAllStudentList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            You have no students currently.
                        </Box>
                        :
                        <>
                            {Array.isArray(allStudentList) && allStudentList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                        </>
                    }
                </>
            }
        </>
    );
};

export default ChooseStudents;