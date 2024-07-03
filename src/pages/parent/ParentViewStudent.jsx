import React, { useEffect } from 'react'
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const ParentViewStudent = () => {
    const { currentUser, userDetails } = useSelector(state => state.user);
    const dispatch = useDispatch()

    const studentID = currentUser?.child

    useEffect(() => {
        dispatch(getUserDetails(studentID, "Student"));
    }, [dispatch, studentID])

    return (
        <div>
            Name: {userDetails?.name}
            <br />
            Roll Number: {userDetails?.rollNum}
            <br />
            Class: {userDetails?.sclassName?.sclassName}
            <br />
            School: {userDetails?.school?.schoolName}
        </div>
    )
}

export default ParentViewStudent