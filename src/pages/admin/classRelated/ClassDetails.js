import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents } from "../../../redux/sclassRelated/sclassHandle";
import {
    Box, Container, Typography, Tab, IconButton, Tabs
} from '@mui/material';
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PostAddIcon from '@mui/icons-material/PostAdd';
import { CustomTabPanel, StyledTabPanel, a11yProps } from "../../../utils/styles";
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { getClassSubjectList } from "../../../redux/userRelated/classHandle";

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        sclassStudents, sclassDetails,
        loading, error, getresponse
    } = useSelector((state) => state.sclass);

    const {
        classSubjectList, responseClassSubjectList
    } = useSelector((state) => state.user);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        // dispatch(getClassSubjectList(classID))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [detailsValue, setDetailsValue] = useState(0);

    const handleChange = (event, newValue) => {
        setDetailsValue(newValue)
    };

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getClassStudents(classID));
                dispatch(resetSubjects())
                dispatch(getClassSubjectList(classID))
            })
    }

    // const subjectColumns = [
    //     { id: 'name', label: 'Subject Name', minWidth: 170 },
    //     { id: 'code', label: 'Subject Code', minWidth: 100 },
    // ]

    // const subjectRows = classSubjectList && classSubjectList.length > 0 && classSubjectList.map((subject) => {
    //     return {
    //         name: subject.subName,
    //         code: subject.subCode,
    //         id: subject._id,
    //     };
    // })

    // const SubjectsButtonHaver = ({ row }) => {
    //     return (
    //         <>
    //             <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
    //                 <DeleteIcon color="error" />
    //             </IconButton>
    //             <BlueButton
    //                 variant="contained"
    //                 onClick={() => {
    //                     navigate(`/Admin/class/subject/${row.id}`)
    //                 }}
    //             >
    //                 View
    //             </BlueButton >
    //         </>
    //     );
    // };

    // const subjectActions = [
    //     {
    //         icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
    //         action: () => navigate(`/Admin/subjects/add/${classID}`)
    //     },
    //     {
    //         icon: <DeleteIcon color="error" />, name: 'Delete Class Subjects',
    //         action: () => deleteHandler(classID, "SubjectsClass")
    //     }
    // ];

    // const ClassSubjectsSection = () => {
    //     return (
    //         <>
    //             {responseClassSubjectList ?
    //                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
    //                     <GreenButton
    //                         variant="contained"
    //                         onClick={() => navigate(`/Admin/subjects/add/${classID}`)}
    //                     >
    //                         Add Subjects
    //                     </GreenButton>
    //                 </Box>
    //                 :
    //                 <>
    //                     <Typography variant="h5" gutterBottom>
    //                         Subjects List:
    //                     </Typography>

    //                     <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
    //                     <SpeedDialTemplate actions={subjectActions} />
    //                 </>
    //             }
    //         </>
    //     )
    // }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </GreenButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Students List:
                        </Typography>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </>
        )
    }

    const ClassDetailsSection = () => {
        const numberOfSubjects = classSubjectList.length;
        const numberOfStudents = sclassStudents.length;
        const numberOfSections = sclassDetails?.sections?.length;

        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    This is Class {sclassDetails?.sclassName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Sections: {numberOfSections}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Subjects: {numberOfSubjects}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Number of Students: {numberOfStudents}
                </Typography>
                {getresponse &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                    >
                        Add Students
                    </GreenButton>
                }
                {responseClassSubjectList &&
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate(`/Admin/subjects/add/${classID}`)}
                    >
                        Add Subjects
                    </GreenButton>
                }
            </>
        );
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{
                        width: '100%', typography: 'body1'
                    }} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={detailsValue} onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                <Tab label="Details" {...a11yProps(0)} />
                                {/* <Tab label="Subjects" {...a11yProps(1)} /> */}
                                <Tab label="Students" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                            <StyledTabPanel value={detailsValue} index={0}>
                                <ClassDetailsSection />
                            </StyledTabPanel>
                            {/* <CustomTabPanel value={detailsValue} index={1}>
                                <ClassSubjectsSection />
                            </CustomTabPanel> */}
                            <CustomTabPanel value={detailsValue} index={1}>
                                <ClassStudentsSection />
                            </CustomTabPanel>
                        </Container>
                    </Box>
                </>
            )}
        </>
    );
};

export default ClassDetails;