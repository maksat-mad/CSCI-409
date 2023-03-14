import React from 'react';
import './NoPage.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const NoPage = () => {
    const {t} = useTranslation();
    localStorage.setItem('path', '/');
    return (
        <div className={"no-page"}>
            <div className={"container"}>
                <h1>{t('no_page')}</h1>
            </div>
            <div className={"my-container"}>
                <Link to="/">{t('go_main')}</Link>
            </div>
        </div>
    );
};

export default NoPage;