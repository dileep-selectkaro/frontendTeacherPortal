import React, { useEffect, useState } from 'react'
import {
    Autocomplete,
    Box, Card, CardContent, FormControl, Grid, Paper, Table,
    TableBody, TableContainer, TableHead, TextField, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { formatFullTime, formatNameObj } from '../../../utils/helperFunctions';
import { StyledTableCell, StyledTableRow, TableCellStyled } from '../../../components/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { getTeacherRoutineListbyAdmin } from '../../../redux/userRelated/classRoutineHandle';
import { getTeacherList } from '../../../redux/userRelated/systemHandle';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BlueButton } from '../../../components/buttonStyles';
import { setPopupMessage } from '../../../redux/userRelated/userSlice';

const ShowTeacherRoutines = () => {
    const dispatch = useDispatch();

    const {
        currentToken, teacherRoutineList, loading,
        responseTeacherRoutineList, weekdays, teacherList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getTeacherList(currentToken, "allTeacherList"));
    }, [currentToken, dispatch]);

    const findSessionsForDay = (dayOfWeek) => {
        const sessions = teacherRoutineList.filter((item) => item.dayOfWeek === dayOfWeek);
        const uniqueTeachers = {};
        sessions.forEach((session) => {
            const teacherName = formatNameObj(session.sessionDetails[0]?.sessionTeacher?.teacherName);
            if (!uniqueTeachers[teacherName]) {
                uniqueTeachers[teacherName] = [];
            }
            uniqueTeachers[teacherName].push(session);
        });
        return uniqueTeachers;
    };

    const [openTab, setOpenTab] = useState(false)

    const [teacherID, setTeacherID] = useState('')

    const tabOpenHandler = () => {
        if (!teacherID) {
            dispatch(setPopupMessage("Please Teacher First"))
        }
        else {
            dispatch(getTeacherRoutineListbyAdmin(teacherID, currentToken));
            setOpenTab(!openTab)
        }
    }

    return (
        <>
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Teacher Time Table
                </Typography>
            </Box>
            <Grid container spacing={7} sx={{ p: 5 }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={teacherList || []}
                            getOptionLabel={(option) => (option?.name || '')}
                            value={teacherList?.find((item) => item?._id === teacherID) || null}
                            onChange={(event, newValue) => {
                                setTeacherID(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Teacher"
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
                    {
                        loading ?
                            <>Loading..</>
                            :
                            <>
                                {responseTeacherRoutineList ?
                                    <Box>
                                        <Typography variant="h5" gutterBottom>
                                            Sorry no schedule found
                                        </Typography>
                                    </Box>
                                    :
                                    <>
                                        <Paper sx={{ width: '100%', overflow: 'hidden', mb: 5 }}>
                                            {Array.isArray(teacherRoutineList) && teacherRoutineList.length > 0 && (
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="class routine table">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                {weekdays.map((day) => (
                                                                    <StyledTableCell key={day}>{day}</StyledTableCell>
                                                                ))}
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <StyledTableRow>
                                                                {weekdays.map((day) => {
                                                                    const teachers = findSessionsForDay(day);
                                                                    return (
                                                                        <TableCellStyled key={day}>
                                                                            {Object.keys(teachers).length > 0 ? (
                                                                                <div>
                                                                                    {Object.entries(teachers).map(([teacherName, sessions]) => (
                                                                                        <div key={teacherName}>
                                                                                            {sessions.map((session, index) => (
                                                                                                <Card key={index} sx={{ mb: 2 }}>
                                                                                                    <CardContent>
                                                                                                        <Typography variant="body2" sx={{ color: 'green' }}>
                                                                                                            <LibraryBooksIcon sx={{ fontSize: '12px', mr: '5px' }} />
                                                                                                            Class: {session?.sclassName?.sclassName} ({session?.section?.sectionName}) <br />
                                                                                                            Subject: {session?.sessionDetails[0]?.sessionSubject?.subName} ({session?.sessionDetails[0]?.sessionSubject?.subCode})
                                                                                                        </Typography>
                                                                                                        <Typography variant="body2" sx={{ color: 'green' }}>
                                                                                                            <AccessTimeIcon sx={{ fontSize: '12px', mr: '5px' }} />
                                                                                                            {`${formatFullTime(new Date(session?.sessionDetails[0]?.sessionStartTime))} - ${formatFullTime(new Date(session?.sessionDetails[0]?.sessionEndTime))}`}
                                                                                                        </Typography>
                                                                                                        <Typography variant="body2" sx={{ color: 'green' }}>
                                                                                                            <PersonIcon sx={{ fontSize: '12px', mr: '5px' }} />
                                                                                                            {`${formatNameObj(session?.sessionDetails[0]?.sessionTeacher?.teacherName)}`}
                                                                                                        </Typography>
                                                                                                        <Typography variant="body2" sx={{ color: 'green' }}>
                                                                                                            <ApartmentIcon sx={{ fontSize: '12px', mr: '5px' }} />
                                                                                                            {`Room: ${session?.sessionDetails[0]?.sessionRoom}`}
                                                                                                        </Typography>
                                                                                                    </CardContent>
                                                                                                </Card>
                                                                                            ))}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            ) : (
                                                                                <Typography color="error">Not Scheduled</Typography>
                                                                            )}
                                                                        </TableCellStyled>
                                                                    );
                                                                })}
                                                            </StyledTableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )}
                                        </Paper>
                                    </>
                                }
                            </>
                    }
                </>
            }
        </>
    )
}

export default ShowTeacherRoutines