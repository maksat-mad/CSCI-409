import React from "react";
import {  Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function AdminRoute({ children }) {
    const { currentUser } = useAuth();
    return ((currentUser.role === 'admin') || (currentUser.role === 'superAdmin')) ? children : <Navigate to="/no-page" />;
}