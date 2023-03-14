import React, {useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import '../../signup-login/Signup-Login.css';
import {useTranslation} from "react-i18next";

const UpdatePassword = () => {
    const {t} = useTranslation();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/update-password');
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError(t('passwords_not_match'));
        }

        if (passwordRef.current.value.length < 6) {
            return setError(t('password_error'));
        }

        if (!passwordRef.current.value) {
            return;
        }

        try {
            setError("");
            setLoading(true);
            await updatePassword(passwordRef.current.value);
            setSuccess(t('password_update_success'))
        } catch (error) {
            setError(t('password_update_error') + '. ' + error.response?.data?.msg);
        }

        setLoading(false);
    }

    return (
        <>
            {success ?
                <>
                    <div className={"my-container input-success"}>
                        <h2>{success}</h2>
                    </div>
                    <div className={"my-container"}>
                        <Link to="/profile">{t('go_profile')}</Link>
                    </div>
                </>
                :
                <div className={"signup-login"}>
                    <div className={"container"}>
                        <h1>{t('password_update')}</h1>
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
                                <label htmlFor={"password"}>{t('password')}:</label><br/>
                                <input type={"password"} id={"password"} name={"password"} required ref={passwordRef}/><br/>
                                <label htmlFor={"password"}>{t('confirm_password')}:</label><br/>
                                <input type={"password"} id={"password2"} name={"password"} required ref={passwordConfirmRef}/><br/>
                                <div className={"container"}>
                                    <button disabled={loading} className={"input-button"} type="submit">{t('update')}</button>
                                </div>
                            </form>
                            <div className={"my-container"}>
                                <Link to="/profile">{t('cancel')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default UpdatePassword;