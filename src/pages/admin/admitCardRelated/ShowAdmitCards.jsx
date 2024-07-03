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
import { getAdmitCardExamScheduleList, getAllAdmitCardList, getAllExaminationList } from '../../../redux/userRelated/examHandle';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import styled from 'styled-components';
import { AdmitCardDialog } from '../../../utils/styles';
import FullEditTemplate from '../../../components/FullEditTemplate';
import { updatingFunction } from '../../../redux/userRelated/userHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { formatDate, formatFullTime } from '../../../utils/helperFunctions';

const ShowAdmitCards = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        allAdmitCardList, currentToken, loading,
        responseAllAdmitCardList, allExaminationList,
        status, error, response, admitCardExamScheduleList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllAdmitCardList(currentToken))
    }, [dispatch, currentToken]);

    const [openEdit, setOpenEdit] = useState(false);
    const [admitCardID, setAdmitCardID] = useState("");

    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false) };

    const [certificateName, setCertificateName] = useState('')
    const [heading, setHeading] = useState('')
    const [title, setTitle] = useState("");
    const [examinationName, setExaminationName] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [examCenter, setExamCenter] = useState("");
    const [footerText, setFooterText] = useState("");

    const [leftLogo, setLeftLogo] = useState('');
    const [rightLogo, setRightLogo] = useState('');
    const [signature, setSignature] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    const dialogOpener = (row) => {
        setOpenEdit(true);
        dispatch(getAllExaminationList(currentToken))
        setAdmitCardID(row.id)

        setCertificateName(row.certificateName);
        setHeading(row.heading);
        setTitle(row.title);
        setExaminationName(row.examinationID);
        setExamCenter(row.examCenter);
        setFooterText(row.footerText);

        setLeftLogo(row.leftLogo);
        setRightLogo(row.rightLogo);
        setSignature(row.signature);
        setBackgroundImage(row.backgroundImage);
    };

    const detailsOpen = (row) => {
        setHeading(row.heading);
        setTitle(row.title);
        setExaminationName(row.examinationName);
        setSchoolName(row.schoolName);
        setExamCenter(row.examCenter);
        setFooterText(row.footerText);

        setLeftLogo(row.leftLogo);
        setRightLogo(row.rightLogo);
        setSignature(row.signature);

        dispatch(getAdmitCardExamScheduleList(currentToken, row?.examinationID))
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
        heading,
        title,
        examinationName,
        examCenter,
        footerText,
        leftLogo,
        rightLogo,
        signature,
        backgroundImage,
    };

    const editHandler = (event) => {
        event.preventDefault();
        dispatch(updatingFunction(admitCardID, fields, "admitCardUpdate", currentToken))
    };

    const admitCardColumns = [
        { id: 'certificateName', label: 'Certificate Name', minWidth: 170 },
        { id: 'examinationName', label: 'Examination Name', minWidth: 170 },
        { id: 'examCenter', label: 'Exam Center', minWidth: 170 },
    ]

    const admitCardRows = allAdmitCardList.map((admitCard) => {
        return {
            id: admitCard?._id,
            certificateName: admitCard?.certificateName,

            heading: admitCard?.heading,
            title: admitCard?.title,
            examinationName: admitCard?.examinationName?.examName,
            examinationID: admitCard?.examinationName?._id,
            schoolName: admitCard?.school?.schoolName,
            examCenter: admitCard?.examCenter,
            footerText: admitCard?.footerText,

            leftLogo: admitCard?.leftLogo,
            rightLogo: admitCard?.rightLogo,
            signature: admitCard?.signature,
            backgroundImage: admitCard?.backgroundImage,
        };
    })

    const AdmitCardsButtonHaver = ({ row }) => {
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
                    <IconButton onClick={() => navigate(`/Admin/admitCards/admitCard/print/${row.id}/${row?.examinationID}`)} color="secondary">
                        <Print color="success" />
                    </IconButton >
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Admit Card',
            action: () => navigate(`/Admin/admitCards/add`)
        },
    ];

    useEffect(() => {
        if (status === 'updated') {
            setOpenEdit(false);
            dispatch(getAllAdmitCardList(currentToken))
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
                    {responseAllAdmitCardList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton onClick={() => navigate("/Admin/admitCards/add")}>
                                Add Admit Card
                            </PurpleButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(allAdmitCardList) && allAdmitCardList.length > 0 &&
                                <TableTemplate buttonHaver={AdmitCardsButtonHaver} columns={admitCardColumns} rows={admitCardRows} />
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
                            <Heading>
                                <H1>{heading}</H1>
                                <H2>{title}</H2>
                                <ExamInfoText>{examinationName}</ExamInfoText>
                            </Heading>
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
                </DetailContainer>
                <ExamInfo>
                    <ExamDetails>
                        <thead>
                            <tr>
                                <TableHeader>Exam Date & Time</TableHeader>
                                <TableHeader>Subject Code</TableHeader>
                                <TableHeader>Subject</TableHeader>
                                <TableHeader>Subject Type</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(admitCardExamScheduleList?.examDetails) && admitCardExamScheduleList?.examDetails.length > 0 && admitCardExamScheduleList?.examDetails?.map((item, index) => {
                                const dateAndTime = `${formatDate(item?.examDate)} ${formatFullTime(new Date(item?.examStartTime))} - ${formatFullTime(new Date(item?.examEndTime))}`
                                return (
                                    <tr key={index}>
                                        <TableData>{dateAndTime}</TableData>
                                        <TableData>{item?.examSubject?.subCode}</TableData>
                                        <TableData>{item?.examSubject?.subName}</TableData>
                                        <TableData>{item?.examSubject?.subType}</TableData>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </ExamDetails>
                </ExamInfo>
                <Footer>
                    <FooterText>{footerText}</FooterText>
                    <EditImgStyled src={signature} alt='Signature' />
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
                                Edit Admit Card
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
                                    <TextField
                                        fullWidth
                                        label="Heading"
                                        variant="outlined"
                                        value={heading}
                                        name="heading"
                                        id="heading"
                                        onChange={(e) => setHeading(e.target.value)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        variant="outlined"
                                        value={title}
                                        name="title"
                                        id="title"
                                        onChange={(e) => setTitle(e.target.value)}
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

                                <EditImgStyled src={signature} alt='Signature' />
                                <Box>
                                    <UploadButtonStyled component='label' variant='contained' htmlFor='signature'>
                                        Upload Signature
                                        <input
                                            hidden
                                            type='file'
                                            onChange={(file) => onImageChange(file, setSignature)}
                                            accept='image/png, image/jpeg'
                                            id='signature'
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

export default ShowAdmitCards;

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

const Heading = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
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

const ExamInfoText = styled.p`
  text-align: center;
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
