import React from "react";
import {  Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AdminRoute({ children }) {
    const { currentUser } = useAuth();
    if (currentUser) {
        return ((currentUser.role === 'ADMIN') || (currentUser.role === 'SUPER_ADMIN')) ? children : <Navigate to="/no-page" />;
    }
    return <Navigate to="/login" />;
}