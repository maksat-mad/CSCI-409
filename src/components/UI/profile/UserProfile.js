import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './UserProfile.css';

const UserProfile = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className={"profile"}>
            <div className={"container"}>
                <h1>Profile</h1>
            </div>
            <div className={"my-container"}>
                {error &&
                    <div className={"input-error"}>
                        (!) {error}
                    </div>
                }
            </div>
            <div className={"my-container"}>
                <strong>Email:</strong> {currentUser.email}
            </div>
            <div className={"my-container"}>
                <Link to="/update-profile">Update Profile</Link>
            </div>
            <div className={"my-container"}>
                <button className={"button-40"} onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default UserProfile;