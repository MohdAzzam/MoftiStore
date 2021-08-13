import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar'
export default function Notification(
    {
        show,
        message,
        type
    }
) {

    const [backgroundColor, setBackgroundColor] = useState('green');
    const options = {
        position: 'bottom-right',
        style: {
            backgroundColor: backgroundColor,
            border: '2px solid white',
            color: 'white',
            fontFamily: 'Menlo, monospace',
            fontSize: '20px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'gray',
            fontSize: '16px',
        },
    }
    const [openSnackbar] = useSnackbar(options);

    useEffect(() => {
        setBackgroundColor(type === 'success' ? 'green' : "red");
    }, [type])

    useEffect(() => {
        if (show) {

            openSnackbar(message);
        }
    }, [show, message])

    return (
        <div></div>
    );
}