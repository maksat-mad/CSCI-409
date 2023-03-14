import React, {useEffect} from 'react';
import { useAuth } from "../../../context/AuthContext";
import './UserProfile.css';
import BlueButton from "./buttons/BlueButton";
import {useTranslation} from "react-i18next";
import GreenButton from "./buttons/GreenButton";
import RedButton from "./buttons/RedButton";
import GreyButton from "./buttons/GreyButton";

const UserProfile = () => {
    const {t} = useTranslation();
    const { currentUser } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

            <div className={"my-container"}>
                <GreenButton url={"/add-product"} text={t('add_product')}/>
            </div>
            <div className={"my-container"}>
                <GreenButton url={"/products-sale"} text={t('products_sale')}/>
            </div>
            <div className={"my-container"}>
                <GreenButton url={"/products-not-sale"} text={t('products_not_sale')}/>
            </div>

            <div className={"my-container"}>
                <RedButton url={"/in-progress"} text={t('in_progress')}/>
            </div>

            <div className={"my-container"}>
                <GreyButton url={"/bought-history"} text={t('bought_history')}/>
            </div>
            <div className={"my-container"}>
                <GreyButton url={"/sold-history"} text={t('sold_history')}/>
            </div>
        </div>
    );
};

export default UserProfile;