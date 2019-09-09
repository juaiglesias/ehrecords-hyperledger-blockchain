import React from 'react';
import { Redirect } from 'react-router-dom';

export default function WithAuth({ Component, ...props }) {
    const isAuth = () => {
        return localStorage.getItem('jwtToken');
    }

    const auth = isAuth();
    if (auth) {
        return <Component {...props} />;
    } else {
        return <Redirect to="/login" />;
    }
}