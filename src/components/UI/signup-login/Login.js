import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import './Signup-Login.css';
import {useTranslation} from "react-i18next";

const Login = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const prevPath = state === null ? "/" : state.prevPath;

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/login');
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (password.length < 6) {
            return setError(t("password_error"));
        }

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate(prevPath);
        } catch (error) {
            setError(t("failed_to_log_in") + '. ' + error.response?.data?.msg);
        }

        setLoading(false);
    }

    const handleEmailChange = (e) => {
        setError('');
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setError('');
        setPassword(e.target.value);
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>{t("login")}</h1>
            </div>
            <div className={"container"}>
                {error &&
                    <div className={"input-error"}>
                        (!) {error}
                    </div>
                }
                {loading &&
                    <div className={"loading"}>
                        {t("loading")}...
                    </div>
                }
            </div>
            <div className={"container"}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor={"email"}>{t("email")}:</label><br/>
                        <input type={"email"} id={"email"} name={"email"} onChange={handleEmailChange} required/><br/>
                        <label htmlFor={"password"}>{t("password")}:</label><br/>
                        <input type={"password"} id={"password"} name={"password"} required onChange={handlePasswordChange}/><br/>
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">{t("login")}</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        <Link to="/forgot-password">{t("forgot_password")}</Link>
                    </div>
                    <div className={"my-container"}>
                        {t("need_account")} <Link to="/signup">{t("signup")}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;