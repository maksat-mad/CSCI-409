import React from 'react';
import {Link} from "react-router-dom";
import '../../../components/UI/ratings-button/Ratings.css';

const RedButton = ({url, text}) => {
    return (
        <div className={"button-container"}>
            <Link to={`${url}`} style={{textDecoration: "none"}} >
                <div className={"ratings-button red-button"}>
                    {text}
                </div>
            </Link>
        </div>
    );
};

export default RedButton;