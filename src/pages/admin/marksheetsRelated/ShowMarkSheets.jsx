import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton, Tooltip, styled as muistyled, FormControl, TextField, Autocomplete, Stack, Typography, Grid
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { Close, DriveFileRenameOutline, Print } from '@mui/icons-material';
import { getAllMarkSheetList, getAllExaminationList } from '../../../redux/userRelated/examHandle';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import styled from 'styled-components';
import { AdmitCardDialog } from '../../../utils/styles';
import FullEditTemplate from '../../../components/FullEditTemplate';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { formatDate } from '../../../utils/helperFunctions';

const ShowMarkSheets = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        allMarkSheetList, currentToken, loading,
        responseAllMarkSheetList, allExaminationList,
        status, error, response,
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllMarkSheetList(currentToken))
    }, [dispatch, currentToken]);

    const [openEdit, setOpenEdit] = useState(false);
    const [markSheetID, setMarkSheetID] = useState("");

    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false) };

    const [certificateName, setCertificateName] = useState('')
    const [bodyText, setBodyText] = useState('')
    const [printingDate, setPrintingDate] = useState("");
    const [examinationName, setExaminationName] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [examCenter, setExamCenter] = useState("");
    const [footerText, setFooterText] = useState("");

    const [headerImage, setHeaderImage] = useState('');

    const [leftLogo, setLeftLogo] = useState('');
    const [rightLogo, setRightLogo] = useState('');
    const [leftSignature, setLeftSignature] = useState('');
    const [middleSignature, setMiddleSignature] = useState('');
    const [rightSignature, setRightSignature] = useState('');

    const [backgroundImage, setBackgroundImage] = useState('');

    const dialogOpener = (row) => {
        setOpenEdit(true);
        dispatch(getAllExaminationList(currentToken))
        setMarkSheetID(row.id)

        setCertificateName(row.certificateName);
        setBodyText(row.bodyText);
        setPrintingDate(row.printingDate);
        setExaminationName(row.examinationID);
        setExamCenter(row.examCenter);
        setFooterText(row.footerText);

        setHeaderImage(row.headerImage);

        setLeftLogo(row.leftLogo);
        setRightLogo(row.rightLogo);
        setLeftSignature(row.leftSignature);
        setMiddleSignature(row.middleSignature);
        setRightSignature(row.rightSignature);
        setBackgroundImage(row.backgroundImage);
    };

    const detailsOpen = (row) => {
        setBodyText(row.bodyText);
        setPrintingDate(row.printingDate);
        setExaminationName(row.examinationName);
        setSchoolName(row.schoolName);
        setExamCenter(row.examCenter);
        setFooterText(row.footerText);

        setHeaderImage(row.headerImage);

        setLeftLogo(row.leftLogo);
        setRightLogo(row.rightLogo);
        setLeftSignature(row.leftSignature);
        setMiddleSignature(row.middleSignature);
        setRightSignature(row.rightSignature);

        setOpen(true)
    };

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

    const editHandler = (event) => {
        event.preventDefault();
        dispatch(updatingFunction(markSheetID, fields, "markSheetUpdate", currentToken))
    };

    const markSheetColumns = [
        { id: 'certificateName', label: 'Certificate Name', minWidth: 170 },
        { id: 'examinationName', label: 'Examination Name', minWidth: 170 },
        { id: 'examCenter', label: 'Exam Center', minWidth: 170 },
    ]

    const markSheetRows = allMarkSheetList.map((markSheet) => {
        return {
            id: markSheet?._id,
            certificateName: markSheet?.certificateName,

            bodyText: markSheet?.bodyText,
            printingDate: markSheet?.printingDate ? formatDate(markSheet?.printingDate) : "",
            examinationName: markSheet?.examinationName?.examName,
            examinationID: markSheet?.examinationName?._id,
            schoolName: markSheet?.school?.schoolName,
            examCenter: markSheet?.examCenter,
            footerText: markSheet?.footerText,

            headerImage: markSheet?.headerImage,

            leftLogo: markSheet?.leftLogo,
            rightLogo: markSheet?.rightLogo,
            leftSignature: markSheet?.leftSignature,
            middleSignature: markSheet?.middleSignature,
            rightSignature: markSheet?.rightSignature,
            backgroundImage: markSheet?.backgroundImage,
        };
    })

    const sampleData = [
        {
            examSubject: 'ENGLISH',
            examMaxMarks: 100,
            examMinMarks: 33,
            examMarksObtained: 85,
            examRemarks: 'Good',
        },
        {
            examSubject: 'MATH',
            examMaxMarks: 100,
            examMinMarks: 33,
            examMarksObtained: 75,
            examRemarks: 'Average',
        },
        {
            examSubject: 'SCIENCE',
            examMaxMarks: 100,
            examMinMarks: 33,
            examMarksObtained: 90,
            examRemarks: 'Excellent',
        }
    ];

    const MarkSheetsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => dialogOpener(row)} color="secondary">
                        <DriveFileRenameOutline color="primary" />
                    </IconButton >
                </Tooltip>
                <BlueButton variant="contained"
                    onClick={() => detailsOpen(row)}>
                    View
                </BlueButton>
                <Tooltip title="Print">
                    <IconButton onClick={() => navigate(`/Admin/markSheets/markSheet/print/${row.id}/${row?.examinationID}`)} color="secondary">
                        <Print color="success" />
                    </IconButton >
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Marksheet',
            action: () => navigate(`/Admin/markSheets/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpenEdit(false);
            dispatch(getAllMarkSheetList(currentToken))
            dispatch(underControl())
        }
        else if (status === 'failed') {
            setOpenEdit(false);
            dispatch(setPopupMessage(response))
        }
        else if (status === 'error') {
            setOpenEdit(false);
            dispatch(setPopupMessage("Network Error"))
        }
    }, [status, error, response, dispatch, currentToken]);

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseAllMarkSheetList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton onClick={() => navigate("/Admin/markSheets/add")}>
                                Add Marksheet
                            </PurpleButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(allMarkSheetList) && allMarkSheetList.length > 0 &&
                                <TableTemplate buttonHaver={MarkSheetsButtonHaver} columns={markSheetColumns} rows={markSheetRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }

            <AdmitCardDialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <Grid container justifyContent="space-between" sx={{
                    paddingLeft: "10px"
                }} >
                    <Grid item>
                        <EditImgStyled src={leftLogo} alt='Left Logo' />
                    </Grid>
                    <Grid item>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <BodyText>
                                <H2>{examinationName}</H2>
                            </BodyText>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}>
                            <EditImgStyled src={rightLogo} alt='Right Logo' />
                        </Box>
                    </Grid>
                </Grid >
                <DetailContainer>
                    <DetailStuff>
                        <InfoParagraph>School Name</InfoParagraph>
                        <InfoParagraph>{schoolName}</InfoParagraph>
                    </DetailStuff>
                    <DetailStuff>
                        <InfoParagraph>Exam Center</InfoParagraph>
                        <InfoParagraph>{examCenter}</InfoParagraph>
                    </DetailStuff>
                    <DetailStuff>
                        <InfoParagraph>{bodyText}</InfoParagraph>
                    </DetailStuff>
                </DetailContainer>
                <ExamInfo>
                    <ExamDetails>
                        <thead>
                            <tr>
                                <TableHeader>Subjects</TableHeader>
                                <TableHeader>Max Marks</TableHeader>
                                <TableHeader>Min Marks</TableHeader>
                                <TableHeader>Marks Obtained</TableHeader>
                                <TableHeader>Remarks</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <TableData>{item?.examSubject}</TableData>
                                        <TableData>{item?.examMaxMarks}</TableData>
                                        <TableData>{item?.examMinMarks}</TableData>
                                        <TableData>{item?.examMarksObtained}</TableData>
                                        <TableData>{item?.examRemarks}</TableData>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </ExamDetails>
                </ExamInfo>
                <Footer>
                    <FooterText>{footerText}</FooterText>
                    <FooterText>{printingDate}</FooterText>
                </Footer>
            </AdmitCardDialog>

            <FullEditTemplate
                open={openEdit}
                setOpen={setOpenEdit}
            >
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
                                Edit Marksheet
                            </Typography>
                        </Stack>
                        <form onSubmit={editHandler}>
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
                                        onChange={(e) => setPrintingDate(e.target.value)}
                                        sx={styles.inputField}
                                        required
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
                                >
                                    Save Changes
                                </BlueButton>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </FullEditTemplate>
        </>
    );
};

export default ShowMarkSheets;

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

const EditImgStyled = muistyled('img')(({ theme }) => ({
    width: 160,
    height: 80,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

const UploadButtonStyled = muistyled(GreenButton)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))

const BodyText = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const H2 = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const ExamInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailStuff = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoParagraph = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const ExamDetails = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const FooterText = styled.p`
  font-size: 12px;
`;
