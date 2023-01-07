import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Signup-Login.css';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>Reset Password</h1>
            </div>
            <div className={"container"}>
                {error &&
                    <div className={"input-error"}>
                        (!) {error}
                    </div>
                }
            </div>
            <div className={"container"}>
                {message &&
                    <div className={"input-success"}>
                        {message}
                    </div>
                }
            </div>
            <div className={"container"}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor={"email"}>Email:</label><br/>
                        <input type={"email"} id={"email"} name={"email"} ref={emailRef} required/><br/>
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">reset password</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        <Link to="/login">Login</Link>
                    </div>
                    <div className={"my-container"}>
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;