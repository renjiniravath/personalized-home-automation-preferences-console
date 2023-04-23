import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';

export default function AlertScreen({alertMessage, alertColor}) {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={alertMessage?true:false}>
            <Alert severity={alertColor || "info"}>{alertMessage}</Alert>
        </Backdrop>
    )
}