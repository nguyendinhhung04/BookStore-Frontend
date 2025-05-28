import { Navigate } from 'react-router-dom';
import React from "react";
import {useSelector} from "react-redux";

export const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated==null) {
        return <Navigate to="/admin/login" replace />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};