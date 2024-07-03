import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';
import { getNoticeList } from '../redux/userRelated/systemHandle';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { noticeList, loading, responseNoticeList, currentToken } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getNoticeList(currentToken))
    }, [dispatch, currentToken]);

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticeList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });
    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            {loading ? (
                <div style={{ fontSize: '20px' }}>Loading...</div>
            ) : responseNoticeList ? (
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
            ) : (
                <>
                    <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {Array.isArray(noticeList) && noticeList.length > 0 &&
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </Paper>
                </>
            )}
        </div>

    )
}

export default SeeNotice