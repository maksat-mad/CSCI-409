import React from 'react';
import {useTranslation} from "react-i18next";

const Error = ({message}) => {
    const {t} = useTranslation();
    return (
        <div>
            <h2 style={{color:'crimson'}}>{t('error')}: {message}</h2>
        </div>
    );
};

export default Error;