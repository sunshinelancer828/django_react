import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ALERT_OFF } from '../actions/type';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizeAlert = () => {
    const dispatch = useDispatch();
    const { message, open, severity } = useSelector(state => state.alert);

    const handleClose = ( reason ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: ALERT_OFF });
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomizeAlert;