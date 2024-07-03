import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { CustomTabPanel, a11yProps } from '../../../utils/styles';
import { InfoOutlined, LockOpen, PersonOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import securityImg from "../../../assets/security.png"
import defaultImg from "../../../assets/avatarimg.png"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, CircularProgress } from '@mui/material';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { LightPurpleButton } from '../../../components/buttonStyles';
import { addingFunction } from '../../../redux/userRelated/userHandle';
import { getSclassList, getStudentHouseList } from '../../../redux/userRelated/systemHandle';
import { getHostelList } from '../../../redux/userRelated/hostelHandle';

const AddStudent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken, response, yearsList,
        error, currentYear, sclassList, studentHouseList,
        hostelList
    } = useSelector(state => state.user);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [profilePic, setProfilePic] = useState(defaultImg)

    useEffect(() => {
        dispatch(getStudentHouseList(currentToken))
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const [sclassName, setSclassName] = useState('')
    const [classSectionList, setClassSectionList] = useState([])
    const [sectionName, setSectionName] = useState("")
    const [house, setHouse] = useState("")
    const [hostel, setHostel] = useState("")

    const [toggle, setToggle] = useState(false)

    const [loader, setLoader] = useState(false)

    const bloodGroups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];

    const [formData, setFormData] = useState({
        name: {
            firstName: '',
            middleName: '',
            lastName: '',
        },
        email: '',
        phone: '',
        rollNum: '',

        password: '',
        confirmPassword: '',

        parent: {
            name: "",
            phone: '',
            email: '',
            occupation: '',
        },

        birthDate: '',
        bloodGroup: '',
        house: '',
        height: '',
        weight: '',
        measurementDate: '',
        medicalHistory: '',
        religion: '',
        caste: '',
        casteCategory: 'General',
        gender: 'Male',

        address: {
            city: '',
            state: '',
            postalCode: '',
            country: 'India'
        },

        admissionNum: '',
        admissionDate: '',
        academicYear: `${currentYear}`,
        residencyStatus: 'Day Scholar',
    });

    useEffect(() => {
        if (formData.residencyStatus === "Hosteller") {
            dispatch(getHostelList(currentToken))
        }
    }, [currentToken, formData.residencyStatus, dispatch]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
        phoneNo: "",
    });

    const validatePhoneNumber = () => {
        const newErrors = {};

        if (formData.phone.trim() === '' || isNaN(formData.phone) || formData.phone.length !== 10) {
            newErrors.phoneNo = 'Phone Number is required and should be a 10-digit number';
        } else {
            newErrors.phoneNo = '';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const validatePasswordInputs = () => {
        const newErrors = {};

        if (formData.password.trim() === '' || formData.password.length < 6) {
            newErrors.password = 'Password is required and should be greater than 6 characters';
        } else {
            newErrors.password = '';
        }

        if (formData.confirmPassword.trim() === '' || formData.confirmPassword.length < 6) {
            newErrors.confirmPassword = 'Password is required and should be greater than 6 characters';
        } else {
            newErrors.confirmPassword = '';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Your password doesn't match";
        } else {
            newErrors.confirmPassword = '';
        }

        if (formData.phone.trim() === '' || isNaN(formData.phone) || formData.phone.length !== 10) {
            newErrors.phoneNo = 'Phone Number is required and should be a 10-digit number';
        } else {
            newErrors.phoneNo = '';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const validateFinalInputs = () => {
        const newErrors = {};

        if (formData.password.trim() === '' || formData.password.length < 6) {
            newErrors.password = 'Password is required and should be greater than 6 characters';
        } else {
            newErrors.password = '';
        }

        if (formData.confirmPassword.trim() === '' || formData.confirmPassword.length < 6) {
            newErrors.confirmPassword = 'Password is required and should be greater than 6 characters';
        } else {
            newErrors.confirmPassword = '';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Your password doesn't match";
        } else {
            newErrors.confirmPassword = '';
        }

        if (formData.phone.trim() === '' || isNaN(formData.phone) || formData.phone.length !== 10) {
            newErrors.phoneNo = 'Phone Number is required and should be a 10-digit number';
        } else {
            newErrors.phoneNo = '';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const prevPage = (e) => {
        e.preventDefault()
        setValue(value - 1);
    };

    const handleNext = () => {
        if (value < 2) {
            setValue(value + 1);
        }
    };

    const nextPage = (e) => {
        e.preventDefault()
        if (validatePhoneNumber()) {
            handleNext();
        }
    };

    const lastPage = () => {
        if (validatePasswordInputs()) {
            handleNext();
        }
    };

    const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

    const formDataUpdated = {
        profilePic,
        ...formDataWithoutConfirmPassword,
        sclassName,
        section: sectionName,
        house,
        hostel,
    };

    const submitHandler = (e) => {
        e.preventDefault()
        if (validateFinalInputs()) {
            setLoader(true)
            dispatch(addingFunction("StudentReg", formDataUpdated, currentToken))
        }
    }

    const onImageChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => setProfilePic(reader.result)
            reader.readAsDataURL(files[0])
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            dispatch(setPopupMessage(response))
            setLoader(false)
        }
        else if (status === 'error') {
            dispatch(setPopupMessage("Network Error"))
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    <Tab
                        label={
                            <div style={tabLabelStyle}>
                                <PersonOutline style={iconStyle} />
                                Account
                            </div>
                        }
                        {...a11yProps(0)}
                    // disabled={true}
                    />
                    <Tab
                        label={
                            <div style={tabLabelStyle}>
                                <LockOpen style={iconStyle} />
                                Security
                            </div>
                        }
                        {...a11yProps(1)}
                    // disabled={true}
                    />
                    <Tab
                        label={
                            <div style={tabLabelStyle}>
                                <InfoOutlined style={iconStyle} />
                                Info
                            </div>
                        }
                        {...a11yProps(2)}
                    // disabled={true}
                    />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <CardContent>
                    <form onSubmit={nextPage}>
                        <Grid container spacing={7}>
                            <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ImgStyled src={profilePic} alt='Profile Pic' />
                                    <Box>
                                        <LightPurpleButton component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                            Upload Profile Picture
                                            <input
                                                hidden
                                                type='file'
                                                onChange={onImageChange}
                                                accept='image/png, image/jpeg'
                                                id='account-settings-upload-image'
                                            />
                                        </LightPurpleButton>
                                        <ResetButtonStyled color='error' variant='outlined' onClick={() => setProfilePic(defaultImg)}>
                                            Reset
                                        </ResetButtonStyled>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="First Name" name="name.firstName" value={formData.name.firstName} onChange={handleInputChange} required />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Middle Name" name="name.middleName" value={formData.name.middleName} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Last Name" name="name.lastName" value={formData.name.lastName} onChange={handleInputChange} required />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Phone" type='number' name="phone" value={formData.phone} onChange={handleInputChange} error={!!errors.phoneNo}
                                    helperText={errors.phoneNo} required />
                            </Grid>

                            <Grid item xs={12}>
                                <LightPurpleButton variant='contained' type="submit" >
                                    Next
                                </LightPurpleButton>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <form>
                    <CardContent sx={{ paddingBottom: 0 }}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={5}>

                                    <Grid item xs={12} sx={{ marginTop: 6 }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="account-settings-new-password"
                                                name="password"
                                                value={formData.password}
                                                label='Create Password'
                                                required
                                                onChange={handleInputChange}
                                                error={!!errors.password}
                                                helperText={errors.password}
                                                type={toggle ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                edge='end'
                                                                onClick={() => setToggle(!toggle)}
                                                                aria-label='toggle password visibility'
                                                            >
                                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                name="confirmPassword"
                                                onChange={handleInputChange}
                                                required
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword}
                                                type={toggle ? 'text' : 'password'}
                                                label='Confirm New Password'
                                                value={formData.confirmPassword}
                                                id='account-settings-confirm-new-password'
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                edge='end'
                                                                onClick={() => setToggle(!toggle)}
                                                                aria-label='toggle password visibility'
                                                            >
                                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                sm={6}
                                xs={12}
                                sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
                            >
                                <img alt='avatar' height={256} src={securityImg} />
                            </Grid>
                        </Grid>
                    </CardContent>

                    <Divider sx={{ margin: 0 }} />

                    <CardContent>

                        <Box sx={{ mt: 11 }}>
                            <Button
                                variant='outlined'
                                sx={{ marginRight: 3.5 }}
                                color='secondary'
                                onClick={prevPage}
                            >
                                Go Back
                            </Button>
                            <LightPurpleButton variant='contained' onClick={lastPage}>
                                Next
                            </LightPurpleButton>
                        </Box>
                    </CardContent>
                </form>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <CardContent>
                    <form onSubmit={submitHandler}>
                        <Grid container spacing={7}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: "grey" }}>
                                    1. Parent Details
                                </Typography>
                            </Grid>
                            <>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="parent.name"
                                        value={formData.parent.name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        label="Phone Number"
                                        name="parent.phone"
                                        value={formData.parent.phone}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="parent.email"
                                        value={formData.parent.email}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Occupation"
                                        name="parent.occupation"
                                        value={formData.parent.occupation}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </>
                            <Grid item xs={12}>
                                <Divider sx={{ marginBottom: 0 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: "grey" }}>
                                    2. Student Details
                                </Typography>
                            </Grid>
                            <>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Date of Birth"
                                        type="date"
                                        name="birthDate"
                                        required
                                        fullWidth
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Blood Group</InputLabel>
                                        <Select
                                            label='Blood Group'
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                        >
                                            {bloodGroups.map((group) => (
                                                <MenuItem key={group} value={group}>{group}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Height"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Weight"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Measurement Date"
                                        type="date"
                                        name="measurementDate"
                                        required
                                        fullWidth
                                        value={formData.measurementDate}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        label="Medical History"
                                        name="medicalHistory"
                                        value={formData.medicalHistory}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Religion"
                                        name="religion"
                                        value={formData.religion}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Caste"
                                        name="caste"
                                        value={formData.caste}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Caste Category</InputLabel>
                                        <Select
                                            label='Caste Category'
                                            name="casteCategory"
                                            value={formData.casteCategory}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value='General'>General</MenuItem>
                                            <MenuItem value='OBC'>OBC</MenuItem>
                                            <MenuItem value='Special'>Special</MenuItem>
                                            <MenuItem value='Physically Challenged'>Physically Challenged</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label='gender'
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value='Male' label='Male' control={<Radio />} />
                                            <FormControlLabel value='Female' label='Female' control={<Radio />} />
                                            <FormControlLabel value='Other' label='Other' control={<Radio />} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </>
                            <Grid item xs={12}>
                                <Divider sx={{ marginBottom: 0 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: "grey" }}>
                                    3. Address Info
                                </Typography>
                            </Grid>
                            <>
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth label="City" name="address.city" value={formData.address.city} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="address.state"
                                        value={formData.address.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Postal Code"
                                        name="address.postalCode"
                                        value={formData.address.postalCode}
                                        onChange={handleInputChange}
                                        required />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Country</InputLabel>
                                        <Select
                                            label='Country'
                                            name="address.country"
                                            value={formData.address.country}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value='India'>India</MenuItem>
                                            <MenuItem value='Nepal'>Nepal</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                            <Grid item xs={12}>
                                <Divider sx={{ marginBottom: 0 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600, color: "grey" }}>
                                    4. Academic Info
                                </Typography>
                            </Grid>
                            <>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Admission Number" type="number" name="admissionNum" value={formData.admissionNum} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField fullWidth label="Admission Date" type="date" name="admissionDate" value={formData.admissionDate} onChange={handleInputChange} required InputLabelProps={{
                                        shrink: true,
                                    }} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Roll Number" type="number" name="rollNum" value={formData.rollNum} onChange={handleInputChange} required />
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
                                                    label="Select Section Name"
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
                                            options={studentHouseList || []}
                                            getOptionLabel={(option) => (option?.studentHouseName || '')}
                                            value={studentHouseList?.find((item) => item?._id === house) || null}
                                            onChange={(event, newValue) => {
                                                setHouse(newValue?._id || '');
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Select House Name"
                                                    required
                                                    fullWidth />
                                            )}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Academic Year</InputLabel>
                                        <Select
                                            label='Academic Year'
                                            name="academicYear"
                                            value={formData.academicYear}
                                            onChange={handleInputChange}
                                        >
                                            {yearsList.map((year) => (
                                                <MenuItem key={year} value={year}>
                                                    {year}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Residency Status</InputLabel>
                                        <Select
                                            label='Residency Status'
                                            name="residencyStatus"
                                            value={formData.residencyStatus}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value='Day Scholar'>Day Scholar</MenuItem>
                                            <MenuItem value='Hosteller'>Hosteller</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {formData.residencyStatus === "Hosteller" &&
                                    <>
                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    options={hostelList || []}
                                                    getOptionLabel={(option) => (option?.hostelName || '')}
                                                    value={hostelList?.find((item) => item?._id === hostel) || null}
                                                    onChange={(event, newValue) => {
                                                        setHostel(newValue?._id || '');
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Select Hostel Name"
                                                            required
                                                            fullWidth />
                                                    )}
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                    </>
                                }
                            </>
                            <Grid item xs={12}>
                                <Button
                                    variant='outlined'
                                    sx={{ marginRight: 3.5 }}
                                    color='secondary'
                                    onClick={prevPage}
                                >
                                    Go Back
                                </Button>
                                <LightPurpleButton variant='contained' type="submit" >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                                </LightPurpleButton>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </CustomTabPanel>
        </Box>
    );
};

export default AddStudent;

const tabLabelStyle = {
    display: 'flex',
    alignItems: 'center',
};

const iconStyle = {
    marginRight: '8px',
};

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))