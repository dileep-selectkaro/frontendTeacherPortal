import { Container, Grid, Paper } from '@mui/material'
import Students from "../../../assets/img1.png";
import Classes from "../../../assets/img2.png";
import Teachers from "../../../assets/img3.png";
import Fees from "../../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSchoolStats } from '../../../redux/userRelated/superAdminHandle';

const SchoolDetails = () => {
    const dispatch = useDispatch();
    const { schoolName, id } = useParams();
    const { schoolStats } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchSchoolStats(id));
    }, [dispatch, id]);

    const numberOfStudents = schoolStats.students;
    const numberOfClasses = schoolStats.sclasses;
    const numberOfTeachers = schoolStats.teachers;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <h4 style={{ fontSize: "38px", textAlign: "center", marginBottom: 10 }}>
                    {schoolName}
                </h4>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Students} alt="Students" />
                            <Title>
                                Total Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Classes} alt="Classes" />
                            <Title>
                                Total Classes
                            </Title>
                            <Data start={0} end={numberOfClasses} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Teachers} alt="Teachers" />
                            <Title>
                                Total Teachers
                            </Title>
                            <Data start={0} end={numberOfTeachers} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Fees} alt="Fees" />
                            <Title>
                                Fees Collection
                            </Title>
                            <Data start={0} end={23000} duration={2.5} prefix="$" />                        </StyledPaper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SchoolDetails

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