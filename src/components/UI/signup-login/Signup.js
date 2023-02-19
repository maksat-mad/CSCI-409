import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import './Signup-Login.css';
import {useTranslation} from "react-i18next";

const Signup = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError(t("passwords_not_match"));
        }

        if (password.length < 6) {
            return setError(t('password_error'));
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password);
            navigate('/');
        } catch {
            setError(t('failed_create_account'));
        }

        setLoading(false);
    }

    const handleEmailChange = (e) => {
        setError("");
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setError("");
        setPassword(e.target.value);
    }

    const handlePasswordConfirmChange = (e) => {
        setError("");
        setPasswordConfirm(e.target.value);
    }

    return (
        <div className={"signup-login"}>
            <div className={"container"}>
                <h1>{t('signup')}</h1>
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
                        <label htmlFor={"email"}>{t('email')}:</label><br/>
                        <input type={"email"} id={"email"} name={"email"} onChange={handleEmailChange} required/><br/>
                        <label htmlFor={"password"}>{t('password')}:</label><br/>
                        <input type={"password"} id={"password"} name={"password"} required onChange={handlePasswordChange}/><br/>
                        <label htmlFor={"password"}>{t('confirm_password')}:</label><br/>
                        <input type={"password"} id={"password2"} name={"password"} required onChange={handlePasswordConfirmChange}/><br/>
                        <div className={"container"}>
                            <button disabled={loading} className={"input-button"} type="submit">{t('signup')}</button>
                        </div>
                    </form>
                    <div className={"my-container"}>
                        {t('have_account')} <Link to="/login">{t('login')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;