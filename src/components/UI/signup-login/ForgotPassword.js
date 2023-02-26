import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import './Signup-Login.css';
import {useTranslation} from "react-i18next";

const ForgotPassword = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
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
            await resetPassword(email);
            setMessage(t("check_inbox"));
        } catch (error) {
            setError(t("failed_reset_password") + '. ' + error.response?.data?.msg);
        }

        setLoading(false);
    }

    const handleEmailChange = (e) => {
        setError('');
        setMessage('');
        setEmail(e.target.value);
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>{t("reset_password")}</h1>
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
                {message &&
                    <div className={"input-success"}>
                        {message}
                    </div>
                }
            </div>
            <div className={"container"}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor={"email"}>{t("email")}:</label><br/>
                        <input type={"email"} id={"email"} name={"email"} onChange={handleEmailChange} required/><br/>
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">{t("reset_password")}</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        <Link to="/login">{t('login')}</Link>
                    </div>
                    <div className={"my-container"}>
                        {t("need_account")} <Link to="/signup">{t("signup")}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;