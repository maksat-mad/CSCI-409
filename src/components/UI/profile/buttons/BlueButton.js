import React from 'react';
import '../../ratings-button/Ratings.css';
import {Link} from "react-router-dom";

const BlueButton = ({url, text}) => {
    return (
        <div className={"button-container"}>
            <Link to={`${url}`} style={{textDecoration: "none"}} >
                <div className={"ratings-button sign-in-to-continue-button"}>
                    {text}
                </div>
            </Link>
        </div>
    );
};

export default BlueButton;