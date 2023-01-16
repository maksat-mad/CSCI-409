import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import './Signup-Login.css';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        if (passwordRef.current.value.length < 6) {
            return setError("Password must be at least 6 symbols");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>Sign Up</h1>
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
                        <label htmlFor={"email"}>Email:</label><br/>
                        <input type={"email"} id={"email"} name={"email"} ref={emailRef} required/><br/>
                        <label htmlFor={"password"}>Password:</label><br/>
                        <input type={"password"} id={"password"} name={"password"} required ref={passwordRef}/><br/>
                        <label htmlFor={"password"}>Confirm password:</label><br/>
                        <input type={"password"} id={"password2"} name={"password"} required ref={passwordConfirmRef}/><br/>
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">sign up</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;