import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import '../signup-login/Signup-Login.css';

const UpdateProfile = () => {
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                navigate("/profile");
            })
            .catch(() => {
                setError("Failed to update account");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>Update Profile</h1>
            </div>
            <div className={"container"}>
                {error &&
                    <div className={"input-error"}>
                        (!) {error}
                    </div>
                }
            </div>
            <div className={"container"}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor={"password"}>Password:</label><br/>
                        <input type={"password"} id={"password"} name={"password"} required ref={passwordRef}/><br/>
                        <label htmlFor={"password"}>Confirm password:</label><br/>
                        <input type={"password"} id={"password2"} name={"password"} required ref={passwordConfirmRef}/><br/>
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">update</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        <Link to="/profile">Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;