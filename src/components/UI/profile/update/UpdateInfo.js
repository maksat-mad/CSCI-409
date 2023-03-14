import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import '../../signup-login/Signup-Login.css';
import {useAuth} from "../../../../context/AuthContext";

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const prohibitedIndexes = [6, 10, 13];

const UpdateInfo = () => {
    const {t} = useTranslation();
    const { updateInfo } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tel, setTel] = useState('+7(7');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFirstNameChange = (e) => {
        setError('');
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setError('');
        setLastName(e.target.value);
    }

    const handleTelChange = (event) => {
        setError('');
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

    async function handleSubmit(e) {
        e.preventDefault();

        let pattern = /^\+([0-9])\(([0-9]{3})\)([0-9]{3})(-)([0-9]{2})(-)([0-9]{2})$/;
        if (!tel.match(pattern)) {
            setError(t('invalid_phone_number') + '. ' + t('format') + ': +7(705)555-55-55');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await updateInfo(firstName, lastName, tel);
            setSuccess(t('update_info_success'));
        } catch (error) {
            setError(t('failed_update_info') + '. ' + error.response?.data?.msg);
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
                        <h1>{t('update_info')}</h1>
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
                                <label htmlFor={"firstName"}>{t('firstName')}:</label><br/>
                                <input type={"firstName"} id={"firstName"} name={t("firstName")} onChange={handleFirstNameChange} required/><br/>
                                <label htmlFor={"lastName"}>{t('lastName')}:</label><br/>
                                <input type={"lastName"} id={"lastName"} name={t("lastName")} onChange={handleLastNameChange} required/><br/>
                                <label htmlFor={"tel"}>{t('tel')}:</label><br/>
                                <input type={"tel"}
                                       id={"tel"}
                                       name={"tel"}
                                       value={tel}
                                       placeholder={"+7(705)555-55-55"}
                                       required onChange={handleTelChange}
                                /><br/>
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

export default UpdateInfo;