import React from 'react';
import '../../ratings-button/Ratings.css';
import {Link} from "react-router-dom";

const GreenButton = ({url, text}) => {
    return (
        <div className={"button-container"}>
            <Link to={`${url}`} style={{textDecoration: "none"}} >
                <div className={"ratings-button leave-review-button"}>
                    {text}
                </div>
            </Link>
        </div>
    );
};

export default GreenButton;