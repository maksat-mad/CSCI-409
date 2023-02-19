import React, { useRef, useState } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import './Signup-Login.css';
import {useTranslation} from "react-i18next";

const Login = () => {
    const {t} = useTranslation();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const prevPath = state === null ? "/" : state.prevPath;

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value.length < 6) {
            return setError(t("password_error"));
        }

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate(prevPath);
        } catch {
            setError(t("failed_to_log_in"));
        }

        setLoading(false);
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
                        <input type={"email"} id={"email"} name={"email"} ref={emailRef} required/><br/>
                        <label htmlFor={"password"}>{t("password")}:</label><br/>
                        <input type={"password"} id={"password"} name={"password"} required ref={passwordRef}/><br/>
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