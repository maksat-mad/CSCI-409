import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import './Signup-Login.css';
import {useTranslation} from "react-i18next";

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const prohibitedIndexes = [6, 10, 13];

const Signup = () => {
    const {t} = useTranslation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('+7(7');

    const { signup } = useAuth();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        let pattern = /^\+([0-9])\(([0-9]{3})\)([0-9]{3})(-)([0-9]{2})(-)([0-9]{2})$/;
        if (!tel.match(pattern)) {
            setError(true);
            setErrorMsg(t('invalid_phone_number') + '. ' + t('format') + ': +7(705)555-55-55');
            return;
        }

        try {
            setError(false);
            setLoading(true);
            await signup(firstName, lastName, email, tel);
            setSuccess(true);
        } catch (error) {
            setError(true);
            setErrorMsg(t('failed_create_account') + '. ' + error.response?.data?.msg);
        }

        setLoading(false);
    }

    const handleFirstNameChange = (e) => {
        setError(false);
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setError(false);
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setError(false);
        setEmail(e.target.value);
    }

    const handleTelChange = (event) => {
        setError(false);
        if (event.target.value.length > 16) {
            return;
        }
        const res = ['+', '7', '(', '7', '', '', ')', '', '', '', '-', '', '', '-', '', ''];
        let index = 4, start = 0;
        if (event.target.value.substring(0, 4) === '+7(7') {
            start = 4;
        }
        event.target.value.substring(start).split('').forEach(value => {
            if (digits.includes(value)) {
                index += prohibitedIndexes.includes(index) ? 1 : 0;
                res[index++] = value;
            }
        });
        setTel(res.slice(0, index).join(''));
    }

    return (
        <>
            {success ?
            <>

                    <div className={'container input-success'}>
                        <h2>{t('check_inbox')}</h2>
                    </div>
                    <div className={'container'}>
                        <h2><Link to="/login">{t('login')}</Link></h2>
                    </div>
            </>
            :
                <div className={"signup-login"}>
                    <div className={"container"}>
                        <h1>{t('signup')}</h1>
                    </div>
                    <div className={"container"}>
                        {error &&
                            <div className={"input-error"}>
                                (!) {errorMsg}
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
                                <label htmlFor={"firstName"}>{t('firstName')}:</label><br/>
                                <input type={"firstName"} id={"firstName"} name={t("firstName")} onChange={handleFirstNameChange} required/><br/>
                                <label htmlFor={"lastName"}>{t('lastName')}:</label><br/>
                                <input type={"lastName"} id={"lastName"} name={t("lastName")} onChange={handleLastNameChange} required/><br/>
                                <label htmlFor={"email"}>{t('email')}:</label><br/>
                                <input type={"email"} id={"email"} name={t("email")} onChange={handleEmailChange} required/><br/>
                                <label htmlFor={"tel"}>{t('tel')}:</label><br/>
                                <input type={"tel"}
                                       id={"tel"}
                                       name={"tel"}
                                       value={tel}
                                       placeholder={"+7(705)555-55-55"}
                                       required onChange={handleTelChange}
                                /><br/>
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
            }
        </>
    );
};

export default Signup;