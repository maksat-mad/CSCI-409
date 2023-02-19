import React from 'react';
import './Ratings.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SignInToContinue = ({productId}) => {
    const {t} = useTranslation();
    return (
        <div className={"button-container"}>
            <Link to={"/login"} state={{ prevPath: `/products/${productId}` }} style={{textDecoration: "none"}} >
                <div className={"ratings-button sign-in-to-continue-button"}>
                    {t('login_to_review')}
                </div>
            </Link>
        </div>
    );
};

export default SignInToContinue;