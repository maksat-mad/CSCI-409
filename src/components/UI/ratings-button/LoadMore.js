import React from 'react';
import './Ratings.css';
import {useTranslation} from "react-i18next";

const LoadMore = ({num, limit, shownComments}) => {
    const {t} = useTranslation();
    return (
        <div className={"button-container"}>
            <span onClick={() => shownComments(num + limit)}>
                <div className={"ratings-button load-more-button"}>
                    {t('load_more')}
                </div>
            </span>
        </div>
    );
};

export default LoadMore;