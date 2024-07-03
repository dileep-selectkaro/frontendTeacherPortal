import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { getSubjectDetails } from '../../../redux/userRelated/classHandle';

const ViewSubject = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { loading, subjectDetails, error } = useSelector((state) => state.user);

  const { subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID));
  }, [dispatch, subjectID]);

  if (error) {
    console.log(error)
  }

  const SubjectDetailsSection = () => {

    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Name : {subjectDetails && subjectDetails.subName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Code : {subjectDetails && subjectDetails.subCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Type : {subjectDetails && subjectDetails.subType}
        </Typography>
      </>
    );
  }

  return (
    <>
      {loading ?
        < div > Loading...</div >
        :
        <>
          <SubjectDetailsSection />
        </>
      }
    </>
  )
}

export default ViewSubject