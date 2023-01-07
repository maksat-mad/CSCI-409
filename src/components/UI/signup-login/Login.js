import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Signup-Login.css';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value.length < 6) {
            return setError("Password must be at least 6 symbols");
        }

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>Login</h1>
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
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">login</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className={"my-container"}>
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;