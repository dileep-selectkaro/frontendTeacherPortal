import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMarkSheetPrintDetails, getStudentExamDetails } from '../../../redux/userRelated/examHandle';
import { Autocomplete, Box, FormControl, Grid, TextField, Typography, styled as muistyled } from '@mui/material';
import styled from 'styled-components';
import { formatDate } from '../../../utils/helperFunctions';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BlueButton } from '../../../components/buttonStyles';
import { setPopupMessage } from '../../../redux/userRelated/userSlice';

const PrintMarkSheet = () => {
  const dispatch = useDispatch();
  const { studentID, acID, examinationID } = useParams();

  const {
    markSheetPrintDetails, currentToken,
    responseMarkSheetPrintDetails, studentExamDetails,
    sessionYearsList, currentSessionYear
  } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getMarkSheetPrintDetails(currentToken, studentID, acID))
  }, [dispatch, currentToken, studentID, acID]);

  const [openTab, setOpenTab] = useState(false)

  const [sessionYear, setSessionYear] = useState(`${currentSessionYear}`)

  const tabOpenHandler = () => {
    if (!sessionYear) {
      dispatch(setPopupMessage("Please Session Year First"))
    }
    else {
      dispatch(getStudentExamDetails(currentToken, studentID, examinationID, sessionYear))
      setOpenTab(!openTab)
    }
  }

  return (
    <>
      <Box elevation={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", px: 5, pt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Select Criteria
        </Typography>
      </Box>
      <Grid container spacing={7} sx={{ p: 5 }}>
        <Grid item xs={12} md={6}>
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
          {responseMarkSheetPrintDetails ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              Not Found
            </Box>
            :
            <StyledMarkSheet>
              <Grid container justifyContent="space-between" sx={{
                paddingLeft: "10px"
              }} >
                <Grid item>
                  <EditImgStyled src={markSheetPrintDetails?.leftLogo} alt='Left Logo' />
                </Grid>
                <Grid item>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <Heading>
                      <H2>{markSheetPrintDetails?.examinationName?.examName}</H2>
                    </Heading>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}>
                    <EditImgStyled src={markSheetPrintDetails?.rightLogo} alt='Right Logo' />
                  </Box>
                </Grid>
              </Grid >
              <DetailContainer>
                <DetailComponent label="Roll Number" value={markSheetPrintDetails?.rollNum} />
                <DetailComponent label="Candidate's Name" value={markSheetPrintDetails?.name} />
                <DetailComponent label="Class" value={`${markSheetPrintDetails?.sclassName?.sclassName} (${markSheetPrintDetails?.section?.sectionName})`} />
                <DetailComponent label="Date of Birth" value={formatDate(markSheetPrintDetails?.birthDate)} />
                <DetailComponent label="Gender" value={markSheetPrintDetails?.gender} />
                <DetailComponent label="Father's Name" value={markSheetPrintDetails?.parent?.name} />
                <DetailComponent label="School Name" value={markSheetPrintDetails?.school?.schoolName} />
                <DetailComponent label="Exam Center" value={markSheetPrintDetails?.examCenter} />
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
                    {Array.isArray(studentExamDetails?.markDetails) && studentExamDetails?.markDetails.length > 0 && studentExamDetails?.markDetails?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <TableData>{item?.examSubject?.subName}</TableData>
                          <TableData>100</TableData>
                          <TableData>33</TableData>
                          <TableData>{item?.marksObtained}</TableData>
                          <TableData>{item?.teacherNote}</TableData>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </ExamDetails>
              </ExamInfo>
              <Footer>
                <FooterText>{markSheetPrintDetails?.footerText}</FooterText>
                <EditImgStyled src={markSheetPrintDetails?.signature} alt='Signature' />
              </Footer>
            </StyledMarkSheet>
          }
        </>
      }
    </>
  )
}

export default PrintMarkSheet

const DetailComponent = ({ label, value }) => {
  return (
    <DetailStuff>
      <InfoParagraph>{label}</InfoParagraph>
      <InfoParagraph>{value}</InfoParagraph>
    </DetailStuff>
  )
}


const StyledMarkSheet = styled.div`
 // width: 700px;
  width: 85%;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  font-family: sans-serif;
`;

const Heading = styled.div`
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

const EditImgStyled = muistyled('img')(({ theme }) => ({
  width: 160,
  height: 80,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))