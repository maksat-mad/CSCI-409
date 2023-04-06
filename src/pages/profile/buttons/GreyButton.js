import React from 'react';
import '../../../components/UI/ratings-button/Ratings.css';
import {Link} from "react-router-dom";

const GreyButton = ({url, text}) => {
    return (
        <div className={"button-container"}>
            <Link to={`${url}`} style={{textDecoration: "none"}} >
                <div className={"ratings-button grey-button"}>
                    {text}
                </div>
            </Link>
        </div>
    );
};

export default GreyButton;