import { Container, Grid, Paper } from '@mui/material'
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSchoolStats } from '../../redux/userRelated/superAdminHandle';

const SuperAdminHomePage = () => {
    const dispatch = useDispatch()
    const { allschoolStats } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchAllSchoolStats());
    }, [dispatch]);

    const numberOfStudents = allschoolStats.students;
    const numberOfSchools = allschoolStats.schools;
    const numberOfTeachers = allschoolStats.teachers;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                                Total Schools
                            </Title>
                            <Data start={0} end={numberOfSchools} duration={5} />
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
                            <Data start={0} end={23000} duration={2.5} prefix="$" />
                        </StyledPaper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SuperAdminHomePage

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