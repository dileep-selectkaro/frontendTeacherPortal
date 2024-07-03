import React, { useEffect, useState } from "react";
import {
    TextField, Box, Typography, CircularProgress,
    FormControl, Stack, Autocomplete, styled
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { addingFunction } from "../../../redux/userRelated/userHandle";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import { getAllExaminationList } from "../../../redux/userRelated/examHandle";

const AddMarkSheet = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        status, currentToken,
        response, error, allExaminationList
    } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllExaminationList(currentToken))
    }, [currentToken, dispatch]);

    const [loader, setLoader] = useState(false)

    const [certificateName, setCertificateName] = useState('')
    const [examinationName, setExaminationName] = useState("");
    const [examCenter, setExamCenter] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [footerText, setFooterText] = useState("");
    const [printingDate, setPrintingDate] = useState('')

    const [headerImage, setHeaderImage] = useState('');

    const [leftLogo, setLeftLogo] = useState('');
    const [rightLogo, setRightLogo] = useState('');
    const [leftSignature, setLeftSignature] = useState('');
    const [middleSignature, setMiddleSignature] = useState('');
    const [rightSignature, setRightSignature] = useState('');

    const [backgroundImage, setBackgroundImage] = useState('');

    const onImageChange = (file, stateFunction) => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => stateFunction(reader.result)
            reader.readAsDataURL(files[0])
        }
    }

    const fields = {
        certificateName,
        examinationName,
        examCenter,
        bodyText,
        footerText,
        printingDate,
        headerImage,
        leftLogo,
        rightLogo,
        leftSignature,
        middleSignature,
        rightSignature,
        backgroundImage,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoader(true)
        // console.log(fields);
        dispatch(addingFunction("markSheetCreate", fields, currentToken))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate(-1);
            dispatch(underControl())
            setLoader(false)
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
        <Box
            sx={{
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    maxWidth: 550,
                    px: 3,
                    py: '100px',
                    width: '100%'
                }}
            >
                <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography variant="h4">
                        Add Marksheet
                    </Typography>
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Certificate Name"
                                variant="outlined"
                                value={certificateName}
                                name="certificateName"
                                id="certificateName"
                                onChange={(e) => setCertificateName(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                options={allExaminationList || []}
                                getOptionLabel={(option) => (option?.examName || '')}
                                value={allExaminationList?.find((item) => item?._id === examinationName) || null}
                                onChange={(event, newValue) => {
                                    setExaminationName(newValue?._id || '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Examination Name"
                                        required
                                        fullWidth
                                    />
                                )}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Exam Center"
                                variant="outlined"
                                value={examCenter}
                                name="examCenter"
                                id="examCenter"
                                onChange={(e) => setExamCenter(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Body Text"
                                variant="outlined"
                                value={bodyText}
                                name="bodyText"
                                id="bodyText"
                                onChange={(e) => setBodyText(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Footer Text"
                                variant="outlined"
                                value={footerText}
                                name="footerText"
                                id="footerText"
                                onChange={(e) => setFooterText(e.target.value)}
                                sx={styles.inputField}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                label="Printing Date"
                                variant="outlined"
                                value={printingDate}
                                name="printingDate"
                                id="printingDate"
                                type="date"
                                onChange={(e) => setPrintingDate(e.target.value)}
                                sx={styles.inputField}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <EditImgStyled src={headerImage} alt='Header Image' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='headerImage'>
                                Upload Header Image
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setHeaderImage)}
                                    accept='image/png, image/jpeg'
                                    id='headerImage'
                                />
                            </UploadButtonStyled>
                        </Box>
                        <EditImgStyled src={leftLogo} alt='Left Logo' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='leftLogo'>
                                Upload Left Logo
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setLeftLogo)}
                                    accept='image/png, image/jpeg'
                                    id='leftLogo'
                                />
                            </UploadButtonStyled>
                        </Box>

                        <EditImgStyled src={rightLogo} alt='Right Logo' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='rightLogo'>
                                Upload Right Logo
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setRightLogo)}
                                    accept='image/png, image/jpeg'
                                    id='rightLogo'
                                />
                            </UploadButtonStyled>
                        </Box>

                        <EditImgStyled src={leftSignature} alt='Left Sign' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='leftSignature'>
                                Upload Left Sign
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setLeftSignature)}
                                    accept='image/png, image/jpeg'
                                    id='leftSignature'
                                />
                            </UploadButtonStyled>
                        </Box>

                        <EditImgStyled src={middleSignature} alt='Middle Sign' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='middleSignature'>
                                Upload Middle Sign
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setMiddleSignature)}
                                    accept='image/png, image/jpeg'
                                    id='middleSignature'
                                />
                            </UploadButtonStyled>
                        </Box>

                        <EditImgStyled src={rightSignature} alt='Right Sign' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='rightSignature'>
                                Upload Right Sign
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setRightSignature)}
                                    accept='image/png, image/jpeg'
                                    id='rightSignature'
                                />
                            </UploadButtonStyled>
                        </Box>

                        <EditImgStyled src={backgroundImage} alt='Background Image' />
                        <Box>
                            <UploadButtonStyled component='label' variant='contained' htmlFor='backgroundImage'>
                                Upload Background Image
                                <input
                                    hidden
                                    type='file'
                                    onChange={(file) => onImageChange(file, setBackgroundImage)}
                                    accept='image/png, image/jpeg'
                                    id='backgroundImage'
                                />
                            </UploadButtonStyled>
                        </Box>

                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                        </BlueButton>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default AddMarkSheet

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
    },
};

const EditImgStyled = styled('img')(({ theme }) => ({
    width: 160,
    height: 80,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

const UploadButtonStyled = styled(GreenButton)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))