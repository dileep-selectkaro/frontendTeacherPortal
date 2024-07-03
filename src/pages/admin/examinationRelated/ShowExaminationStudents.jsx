import React, { useEffect, useState } from 'react'
import { BlueButton, PurpleButton } from '../../../components/buttonStyles'
import {
    Autocomplete, Box, Checkbox, FormControl, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getSclassList } from '../../../redux/userRelated/systemHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { getClassSectionStudentList } from '../../../redux/userRelated/classHandle';
import { useParams } from 'react-router-dom';
import { getExamStudentList } from '../../../redux/userRelated/examHandle';
import { addingFunction } from '../../../redux/userRelated/userHandle';

const ShowExaminationStudents = () => {
    const dispatch = useDispatch();
    const { examGroup, examinationType, sessionYear } = useParams();

    const {
        currentToken, sclassSectionStudentList, sclassList, examStudentList,
        responseSclassSectionStudentList, status, error, response,
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [openTab, setOpenTab] = useState(false)

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")

    const tabOpenHandler = () => {
        if (!sclassName) {
            dispatch(setPopupMessage("Please Select Class First"));
        } else if (!sectionName) {
            dispatch(setPopupMessage("Please Select Section First"));
        } else {
            dispatch(getClassSectionStudentList(sclassName, sectionName));
            dispatch(getExamStudentList(sclassName, sectionName, sessionYear, currentToken, examinationType))
            setOpenTab(!openTab);
        }
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const initiallySelectedStudents = examStudentList?.map(student => student?._id);
        setSelected(initiallySelectedStudents);
    }, [examStudentList]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((row) => row.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const saveHandler = () => {
        const fields = {
            examGroup,
            examinationType,
            sessionYear,
            sclass: sclassName,
            section: sectionName,
            examStudents: selected
        }
        dispatch(addingFunction("examStudentCreate", fields, currentToken));
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 120 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'gender', label: 'Gender', minWidth: 100 },
    ];

    const rows = sclassSectionStudentList && sclassSectionStudentList.length > 0 && sclassSectionStudentList.map((student) => {
        const id = student._id;
        return {
            name: student?.name,
            rollNum: student.rollNum,
            gender: student.gender,
            id: id,
        };
    });

    useEffect(() => {
        if (status === 'added') {
            dispatch(setPopupMessage("Done Successfully"))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch]);

    return (
        <>
            <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Exam Students
                </Typography>
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
                    {responseSclassSectionStudentList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no students found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden', mb: 5 }}>
                                {Array.isArray(sclassSectionStudentList) && sclassSectionStudentList.length > 0 &&
                                    <Box sx={{ p: 2 }}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                indeterminate={selected.length > 0 && selected.length < rows.length}
                                                                checked={rows.length > 0 && selected.length === rows.length}
                                                                onChange={handleSelectAllClick}
                                                                inputProps={{
                                                                    'aria-label': 'select all desserts',
                                                                }}
                                                            />
                                                        </TableCell>
                                                        {columns.map((column) => (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.numeric ? 'right' : 'left'}
                                                                padding={column.disablePadding ? 'none' : 'normal'}
                                                            >
                                                                {column.label}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => {
                                                            const isItemSelected = isSelected(row.id);
                                                            const labelId = `enhanced-table-checkbox-${row.id}`;

                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    onClick={(event) => handleClick(event, row.id)}
                                                                    role="checkbox"
                                                                    aria-checked={isItemSelected}
                                                                    tabIndex={-1}
                                                                    key={row.id}
                                                                    selected={isItemSelected}
                                                                    sx={{ cursor: 'pointer' }}
                                                                >
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox
                                                                            color="primary"
                                                                            checked={isItemSelected}
                                                                            inputProps={{
                                                                                'aria-labelledby': labelId,
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    {columns.map((column) => (
                                                                        <TableCell key={column.id} align={column.numeric ? 'right' : 'left'}>
                                                                            {row[column.id]}
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={(event, newPage) => setPage(newPage)}
                                            onRowsPerPageChange={(event) => {
                                                setRowsPerPage(parseInt(event.target.value, 10));
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

            {openTab && Array.isArray(sclassSectionStudentList) && sclassSectionStudentList.length > 0 &&
                <Grid container spacing={7} sx={{ p: 5 }}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <PurpleButton onClick={() => saveHandler()}>
                                Save
                            </PurpleButton>
                        </Box>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default ShowExaminationStudents