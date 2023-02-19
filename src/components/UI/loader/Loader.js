import React from 'react';
import {useTranslation} from "react-i18next";

const Loader = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h2>{t('loading')}...</h2>
        </div>
    );
};

export default Loader;