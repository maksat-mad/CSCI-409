import React from "react";
import {  Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function SuperAdminRoute({ children }) {
    const { currentUser } = useAuth();
    if (currentUser) {
        return currentUser.role === 'superAdmin' ? children : <Navigate to="/no-page" />;
    }
    return <Navigate to="/login" />;
}