import { useState } from 'react';

export default function useSnackBar() {
    const [statusSnackBar, setStatusSnackBarBase] = useState('');

    const setStatusSnackBar = (obj) => {
        setStatusSnackBarBase({...obj});
    };

    const closeSnackBar = () => {
        setStatusSnackBarBase('');
    };

    return {statusSnackBar, setStatusSnackBar, closeSnackBar};
}