import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdmitCardExamScheduleList, getAdmitCardPrintDetails } from '../../../redux/userRelated/examHandle';
import { Box, Grid, styled as muistyled } from '@mui/material';
import styled from 'styled-components';
import { formatDate, formatFullTime } from '../../../utils/helperFunctions';

const PrintAdmitCard = () => {
  const dispatch = useDispatch();
  const { studentID, acID, examinationID } = useParams();

  const {
    admitCardPrintDetails, currentToken, loading,
    responseAdmitCardPrintDetails, admitCardExamScheduleList
  } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAdmitCardPrintDetails(currentToken, studentID, acID))
    dispatch(getAdmitCardExamScheduleList(currentToken, examinationID))
  }, [dispatch, currentToken, studentID, acID, examinationID]);

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {responseAdmitCardPrintDetails ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              Not FOund
            </Box>
            :
            <StyledAdmitCard>
              <Grid container justifyContent="space-between" sx={{
                paddingLeft: "10px"
              }} >
                <Grid item>
                  <EditImgStyled src={admitCardPrintDetails?.leftLogo} alt='Left Logo' />
                </Grid>
                <Grid item>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <Heading>
                      <H1>{admitCardPrintDetails?.heading}</H1>
                      <H2>{admitCardPrintDetails?.title}</H2>
                      <ExamInfoText>{admitCardPrintDetails?.examinationName?.examName}</ExamInfoText>
                    </Heading>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}>
                    <EditImgStyled src={admitCardPrintDetails?.rightLogo} alt='Right Logo' />
                  </Box>
                </Grid>
              </Grid >
              <DetailContainer>
                <DetailComponent label="Roll Number" value={admitCardPrintDetails?.rollNum} />
                <DetailComponent label="Candidate's Name" value={admitCardPrintDetails?.name} />
                <DetailComponent label="Class" value={`${admitCardPrintDetails?.sclassName?.sclassName} (${admitCardPrintDetails?.section?.sectionName})`} />
                <DetailComponent label="Date of Birth" value={formatDate(admitCardPrintDetails?.birthDate)} />
                <DetailComponent label="Gender" value={admitCardPrintDetails?.gender} />
                <DetailComponent label="Father's Name" value={admitCardPrintDetails?.parent?.name} />
                <DetailComponent label="School Name" value={admitCardPrintDetails?.school?.schoolName} />
                <DetailComponent label="Exam Center" value={admitCardPrintDetails?.examCenter} />
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
                <FooterText>{admitCardPrintDetails?.footerText}</FooterText>
                <EditImgStyled src={admitCardPrintDetails?.signature} alt='Signature' />
              </Footer>
            </StyledAdmitCard>
          }
        </>
      }
    </>
  )
}

export default PrintAdmitCard

const DetailComponent = ({ label, value }) => {
  return (
    <DetailStuff>
      <InfoParagraph>{label}</InfoParagraph>
      <InfoParagraph>{value}</InfoParagraph>
    </DetailStuff>
  )
}


const StyledAdmitCard = styled.div`
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

const EditImgStyled = muistyled('img')(({ theme }) => ({
  width: 160,
  height: 80,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))