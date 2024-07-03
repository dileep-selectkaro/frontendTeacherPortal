import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Paper, Autocomplete,
    TextField, FormControl, Grid, Typography,
    Box, Table, TableBody, TableContainer, TableHead, TablePagination
} from '@mui/material';
import { getExamGroupList, getExamResultList, getExamSubjectList, getExaminationList } from '../../../redux/userRelated/examHandle';
import { BlueButton } from '../../../components/buttonStyles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { setPopupMessage } from '../../../redux/userRelated/userSlice';
import { getSclassList } from '../../../redux/userRelated/systemHandle';
import { formatNameObj } from '../../../utils/helperFunctions';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ShowExamResult = () => {
    const dispatch = useDispatch();

    const {
        examGroupList, currentToken, examResultList,
        responseExamResultList, examinationList, sclassList,
        sessionYearsList, currentSessionYear, examSubjectList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getExamGroupList(currentToken))
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [dispatch, currentToken]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openTab, setOpenTab] = useState(false)
    const [examGroup, setExamGroup] = useState('')
    const [examinationType, setExaminationType] = useState('')

    const [sessionYear, setSessionYear] = useState(`${currentSessionYear}`)
    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    useEffect(() => {
        if (examGroup) {
            dispatch(getExaminationList(examGroup, currentToken))
        }
    }, [dispatch, currentToken, examGroup]);

    const tabOpenHandler = () => {
        if (!examGroup) {
            dispatch(setPopupMessage("Please Select Exam Group First"))
        }
        else if (!examinationType) {
            dispatch(setPopupMessage("Please Select Examination First"))
        }
        else if (!sclassName) {
            dispatch(setPopupMessage("Please Select Class First"));
        } else if (!sectionName) {
            dispatch(setPopupMessage("Please Select Section First"));
        }
        else {
            dispatch(getExamResultList(examGroup, examinationType, sclassName, sectionName, sessionYear, currentToken))
            dispatch(getExamSubjectList(examGroup, currentToken, examinationType))
            setOpenTab(!openTab)
        }
    }

    const resultColumns = [
        { id: 'rollNum', label: 'Roll Number', width: 170 },
        { id: 'name', label: 'Name', width: 170 },
        ...examSubjectList.map(item => ({
            id: item.subName,
            label: item.subDetail,
            width: 140,
        })),
        { id: 'grandTotal', label: 'Grand Total', width: 100 },
        { id: 'percent', label: 'Percent (%)', width: 100 },
        { id: 'rank', label: 'Rank', width: 100 },
        { id: 'result', label: 'Result', width: 100 },
    ];

    const calculateResult = (student) => {
        const grandTotalCalculated = student?.markDetails?.reduce((total, subject) => total + subject.marksObtained, 0);

        const totalMarks = examSubjectList.reduce((total, subject) => total + parseInt(subject.examMaxMarks), 0);

        const percent = (grandTotalCalculated / totalMarks) * 100;

        const result = percent >= 33 ? 'Pass' : 'Fail';

        const grandTotal = `${grandTotalCalculated}/${totalMarks}`

        return { grandTotal, percent, result };
    };


    const resultRows = examResultList.map(item => {
        const studentFullName = item?.student?.studentName ? formatNameObj(item?.student?.studentName) : null;
        const studentRollNum = item?.student?.rollNum;
        const markDetails = item?.markDetails;

        const studentData = {
            id: item._id,
            name: studentFullName,
            rollNum: studentRollNum,
        };

        examSubjectList.forEach(item => {
            const subName = item?.subName
            const markItem = markDetails.find(subject => subject?.examSubject?.subName === subName);
            studentData[subName] = markItem
                ? markItem.absentStatus
                    ? "(F) Absent"
                    : markItem.marksObtained
                : '';
        });

        const { grandTotal, percent, result } = calculateResult(item);

        studentData.grandTotal = grandTotal;
        studentData.percent = percent;
        studentData.result = result;

        return studentData;
    })
        .sort((a, b) => b.percent - a.percent);

    resultRows.forEach((student, index) => {
        student.rank = index + 1;
    });

    const columns = resultColumns
    const rows = resultRows

    return (
        <>
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Select Criteria
                </Typography>
            </Box>
            <Grid container spacing={7} sx={{ p: 5 }}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={examGroupList || []}
                            getOptionLabel={(option) => (option?.examGroupName || '')}
                            value={examGroupList?.find((item) => item?._id === examGroup) || null}
                            onChange={(event, newValue) => {
                                setExamGroup(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Exam Group"
                                    required
                                    fullWidth
                                />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={examinationList || []}
                            getOptionLabel={(option) => (option?.examName || '')}
                            value={examinationList?.find((item) => item?._id === examinationType) || null}
                            onChange={(event, newValue) => {
                                setExaminationType(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Examination"
                                    required
                                    fullWidth
                                />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={sessionYearsList || []}
                            getOptionLabel={(option) => option.toString()}
                            value={sessionYear || null}
                            onChange={(event, newValue) => {
                                setSessionYear(newValue || null);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Session" required fullWidth />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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
                    {responseExamResultList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no result found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(examResultList) && examResultList.length > 0 &&
                                    <Box sx={{ p: 2 }}>
                                        <TableContainer>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <StyledTableRow>
                                                        {columns.map((column, index) => (
                                                            <StyledTableCell
                                                                key={index}
                                                                align={column.align}
                                                                style={{ minWidth: column.minWidth }}
                                                            >
                                                                {column.label}
                                                            </StyledTableCell>
                                                        ))}
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => {
                                                            return (
                                                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                    {columns.map((column, index) => {
                                                                        const value = row[column.id];
                                                                        return (
                                                                            <StyledTableCell key={index} align={column.align}>
                                                                                {
                                                                                    column.format && typeof value === 'number'
                                                                                        ? column.format(value)
                                                                                        : value
                                                                                }
                                                                            </StyledTableCell>
                                                                        );
                                                                    })}
                                                                </StyledTableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 100]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={(event, newPage) => setPage(newPage)}
                                            onRowsPerPageChange={(event) => {
                                                setRowsPerPage(parseInt(event.target.value, 5));
                                                setPage(0);
                                            }}
                                        />
                                    </Box>
                                }
                            </Paper>

                        </>
                    }
                </>
            }
        </>
    );
};

export default ShowExamResult;