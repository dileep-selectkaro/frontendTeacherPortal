import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Paper, Typography,
    Box, Table, TableBody, TableContainer, TableHead, TablePagination
} from '@mui/material';
import { getExamRankList, getExamSubjectList } from '../../../redux/userRelated/examHandle';
import { formatNameObj } from '../../../utils/helperFunctions';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { useParams } from 'react-router-dom';

const ShowGeneratedRanks = () => {
    const dispatch = useDispatch();
    const { examGroup, examinationType, sessionYear } = useParams()

    const {
        currentToken, examRankList, loading,
        responseExamRankList, examSubjectList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getExamRankList(examGroup, examinationType, sessionYear, currentToken))
        dispatch(getExamSubjectList(examGroup, currentToken, examinationType))
    }, [dispatch, currentToken, examGroup, examinationType, sessionYear]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const rankColumns = [
        { id: 'rollNum', label: 'Roll Number', width: 170 },
        { id: 'sclass', label: 'Class', width: 170 },
        { id: 'section', label: 'Section', width: 170 },
        { id: 'name', label: 'Student Name', width: 170 },
        { id: 'grandTotal', label: 'Result', width: 100 },
        { id: 'percent', label: 'Percent (%)', width: 100 },
        { id: 'rank', label: 'Rank', width: 100 },
    ];

    const calculateResult = (student) => {
        const grandTotalCalculated = student?.markDetails?.reduce((total, subject) => total + subject.marksObtained, 0);

        const totalMarks = examSubjectList.reduce((total, subject) => total + parseInt(subject.examMaxMarks), 0);

        const percent = (grandTotalCalculated / totalMarks) * 100;

        const grandTotal = `${grandTotalCalculated}/${totalMarks}`

        return { grandTotal, percent };
    };

    const rankRows = examRankList.map(item => {
        const studentFullName = item?.student?.studentName ? formatNameObj(item?.student?.studentName) : null;
        const studentRollNum = item?.student?.rollNum;
        const sclass = item?.sclass?.sclassName;
        const section = item?.section?.sectionName;

        const studentData = {
            id: item._id,
            name: studentFullName,
            rollNum: studentRollNum,
            sclass: sclass,
            section: section,
        };

        const { grandTotal, percent } = calculateResult(item);

        studentData.grandTotal = grandTotal;
        studentData.percent = percent;

        return studentData;
    })
        .sort((a, b) => b.percent - a.percent);

    rankRows.forEach((student, index) => {
        student.rank = index + 1;
    });

    const columns = rankColumns
    const rows = rankRows

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseExamRankList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no rank found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(examRankList) && examRankList.length > 0 &&
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

export default ShowGeneratedRanks;