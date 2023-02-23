import React from 'react';
import { useAuth } from "../../../context/AuthContext";
import './UserProfile.css';
import BlueButton from "./buttons/BlueButton";
import {useTranslation} from "react-i18next";

const UserProfile = () => {
    const {t} = useTranslation();
    const { currentUser } = useAuth();

    return (
        <div className={"profile"}>
            <div className={"container"}>
                <h1>{t('profile')}</h1>
            </div>
            <div className={"my-container"}>
                <strong>{t('email')}:</strong> {currentUser.login}
            </div>
            <div className={"my-container"}>
                <BlueButton url={"/update-password"} text={t('update_password')}/>
            </div>
            <div className={"my-container"}>
                <BlueButton url={"/update-info"} text={t('update_info')}/>
            </div>
        </div>
    );
};

export default UserProfile;