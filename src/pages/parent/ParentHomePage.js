import React from 'react'
import { Container, Grid, Paper } from '@mui/material'
import styled from 'styled-components';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";

const ParentHomePage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Subject} alt="Subjects" />
                        <Title>
                            Total Subjects
                        </Title>
                        <Data start={0} end={5} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Assignment} alt="Assignments" />
                        <Title>
                            Total Assignments
                        </Title>
                        <Data start={0} end={15} duration={4} />
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ParentHomePage

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

