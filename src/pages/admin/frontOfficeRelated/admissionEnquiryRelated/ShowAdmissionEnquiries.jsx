import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Autocomplete, Box, FormControl,
    Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography
} from '@mui/material';
import { Delete, DriveFileRenameOutline, KeyboardArrowDown, KeyboardArrowUp, Phone, PostAdd } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import SpeedDialTemplate from '../../../../components/SpeedDialTemplate';
import { BlueButton } from '../../../../components/buttonStyles'
import { getSclassList } from '../../../../redux/userRelated/systemHandle';
import { setPopupMessage } from '../../../../redux/userRelated/userSlice';
import TableTemplate from '../../../../components/TableTemplate';
import { formatDate } from '../../../../utils/helperFunctions';
import { getAdmissionEnquiryList, getSourceList } from '../../../../redux/userRelated/frontOfficeHandle';

const ShowAdmissionEnquiries = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        currentToken, sclassList, sourceList,
        admissionEnquiryList, responseAdmissionEnquiryList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSourceList(currentToken))
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [openTab, setOpenTab] = useState(false)

    const [sclass, setSclass] = useState('')
    const [source, setSource] = useState("")
    const [admissionEnquiryStatus, setAdmissionEnquiryStatus] = useState("Active")

    const tabOpenHandler = () => {
        if (!sclass) {
            dispatch(setPopupMessage("Please Select Class First"))
        }
        else if (!source) {
            dispatch(setPopupMessage("Please Select Source First"))
        }
        else {
            dispatch(getAdmissionEnquiryList(sclass, source, admissionEnquiryStatus, currentToken))
            setOpenTab(!openTab)
        }
    }

    const admissionEnquiryColumns = [
        { id: 'providedName', label: 'Name', minWidth: 120 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'sourceName', label: 'Source', minWidth: 100 },
        { id: 'date', label: 'Enquiry Date', minWidth: 100 },
        { id: 'followUpDate', label: 'Follow Up Date', minWidth: 100 },
        { id: 'admissionEnquiryStatus', label: 'Status', minWidth: 100 },
    ];

    const admissionEnquiryRows = admissionEnquiryList.map((admissionEnquiry) => {
        return {
            providedName: admissionEnquiry?.providedName,
            sourceName: admissionEnquiry?.source?.sourceName,
            email: admissionEnquiry?.email,
            sourceID: admissionEnquiry?.source?._id,
            phone: admissionEnquiry?.phone,
            idCard: admissionEnquiry?.idCard,
            numberOfChild: admissionEnquiry?.numberOfChild,
            date: admissionEnquiry?.date ? formatDate(admissionEnquiry?.date) : "",
            followUpDate: admissionEnquiry?.followUpDate ? formatDate(admissionEnquiry?.followUpDate) : "",
            note: admissionEnquiry?.note,
            admissionEnquiryStatus: admissionEnquiry?.admissionEnquiryStatus,
            id: admissionEnquiry?._id,
        };
    });

    const AdmissionEnquiriesButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Follow Up Admission Enquiry">
                    <IconButton onClick={() => console.log(row)} color="secondary">
                        <Phone color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton onClick={() => console.log(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => console.log(row)}>
                        <Delete color="error" />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAdd color="primary" />, name: 'Add New Admission Enquiry',
            action: () => navigate(`/Admin/admissionEnquiries/add`)
        },
    ];

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
                            value={sclassList?.find((item) => item?._id === sclass) || null}
                            onChange={(event, newValue) => {
                                setSclass(newValue?._id || '');
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
                            options={sourceList || []}
                            getOptionLabel={(option) => (option?.sourceName || '')}
                            value={sourceList?.find((item) => item?._id === source) || null}
                            onChange={(event, newValue) => {
                                setSource(newValue?._id || '');
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Select Source"
                                    required
                                    fullWidth />
                            )}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="admissionEnquiryStatus">Status</InputLabel>
                        <Select
                            label='Meeting With'
                            id="admissionEnquiryStatus"
                            name="admissionEnquiryStatus"
                            value={admissionEnquiryStatus}
                            onChange={(e) => setAdmissionEnquiryStatus(e.target.value)}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Active'>Active</MenuItem>
                            <MenuItem value='Passive'>Passive</MenuItem>
                            <MenuItem value='Dead'>Dead</MenuItem>
                            <MenuItem value='Won'>Won</MenuItem>
                            <MenuItem value='Lost'>Lost</MenuItem>
                        </Select>
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
                    {responseAdmissionEnquiryList ?
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Sorry no schedule found
                            </Typography>
                        </Box>
                        :
                        <>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                {Array.isArray(admissionEnquiryList) && admissionEnquiryList.length > 0 &&
                                    <TableTemplate buttonHaver={AdmissionEnquiriesButtonHaver} columns={admissionEnquiryColumns} rows={admissionEnquiryRows} />
                                }
                            </Paper>

                        </>
                    }
                </>
            }
        </>
    )
}

export default ShowAdmissionEnquiries