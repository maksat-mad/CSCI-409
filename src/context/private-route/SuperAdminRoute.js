import React from "react";
import {  Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SuperAdminRoute({ children }) {
    const { currentUser } = useAuth();
    if (currentUser) {
        return currentUser.role === 'SUPER_ADMIN' ? children : <Navigate to="/no-page" />;
    }
    return <Navigate to="/login" />;
}