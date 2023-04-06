import React, {useEffect} from 'react';
import { useAuth } from "../../context/AuthContext";
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
        localStorage.setItem('path', '/profile');
    }, []);

    return (
        <div className={"profile"}>
            <div className={"container"}>
                <h1>{currentUser.role === 'user' ? t('profile') : currentUser.role === 'admin' ? t('admin_profile') : t('super_admin_profile')}</h1>
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

            {currentUser.role === 'user' &&
                <>
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
                </>
            }
            {((currentUser.role === 'admin') || (currentUser.role === 'superAdmin')) &&
                <>
                    <div className={"my-container"}>
                        <GreenButton url={"/user-management"} text={t('user_management')}/>
                    </div>
                </>
            }
            {currentUser.role === 'superAdmin' &&
                <>
                    <div className={"my-container"}>
                        <RedButton url={"/create-admin"} text={t('create_admin')}/>
                    </div>
                    <div className={"my-container"}>
                        <GreyButton url={"/admin-management"} text={t('admin_management')}/>
                    </div>
                </>
            }
        </div>
    );
};

export default UserProfile;