import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Paper, Box, IconButton, Grid, Autocomplete, TextField, Typography, FormControl } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlueButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { getSclassList } from '../../../redux/userRelated/systemHandle';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { getClassSectionStudentList } from '../../../redux/userRelated/classHandle';

const ShowStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        status, loading, currentToken, sclassList,
        sclassSectionStudentList, responseSclassSectionStudentList
    } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [openTab, setOpenTab] = useState(false)

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const tabOpenHandler = () => {
        if (!sclassName) {
            dispatch(setPopupMessage("Please Select Class First"))
        }
        else if (!sectionName) {
            dispatch(setPopupMessage("Please Select Section First"))
        }
        else {
            dispatch(getClassSectionStudentList(sclassName, sectionName));
            setOpenTab(!openTab)
        }
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = sclassSectionStudentList && sclassSectionStudentList.length > 0 && sclassSectionStudentList.map((student) => {

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
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}>
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate(`/Admin/students/add`)
        },
    ];

    useEffect(() => {
        if (status === 'deleted') {
            dispatch(getClassSectionStudentList(sclassName, sectionName));
            dispatch(underControl())
        }
    }, [status, dispatch, sclassName, sectionName]);

    return (
        <>
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Select Criteria
                </Typography>
                <SpeedDialTemplate actions={actions} />
            </Box>
            <Grid container spacing={7} sx={{ p: 5 }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={sclassList || []}
                            getOptionLabel={(option) => (option?.sclassName || '')}
                            value={sclassList?.find((item) => item?._id === sclassName) || null}
                            onChange={(event, newValue) => {
                                setSclassName(newValue?._id || '');
                                setClassSectionList(newValue?.sections || []);
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Class Name"
                                    required
                                    fullWidth />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={classSectionList || []}
                            getOptionLabel={(option) => (option?.sectionName || '')}
                            value={classSectionList?.find((item) => item?._id === sectionName) || null}
                            onChange={(event, newValue) => {
                                setSectionName(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Section"
                                    required
                                    fullWidth />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                        <BlueButton onClick={() => tabOpenHandler()}>
                            Search {openTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlueButton>
                    </Box>
                </Grid>
            </Grid>
            {openTab &&
                <>
                    {loading ?
                        <div>Loading...</div>
                        :
                        <>
                            {responseSclassSectionStudentList ?
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                    <Typography variant="h5" gutterBottom>
                                        Sorry no students found
                                    </Typography>
                                </Box>
                                :
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    {Array.isArray(sclassSectionStudentList) && sclassSectionStudentList.length > 0 &&
                                        <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                                    }
                                </Paper>
                            }
                        </>
                    }
                </>
            }
        </>
    );
};

export default ShowStudents;