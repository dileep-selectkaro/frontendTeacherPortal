import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup, underControl } from '../redux/userRelated/userSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const MessagePopup = () => {
    const dispatch = useDispatch();

    const {
        showPopup, message
    } = useSelector(state => state.user);

    const vertical = "top"
    const horizontal = "right"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closePopup())
        dispatch(underControl())
    };

    return (
        <>
            <Snackbar open={showPopup} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                {
                    (message === "Done Successfully") ?
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                        :
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                }
            </Snackbar>
        </>
    );
};

export default MessagePopup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
