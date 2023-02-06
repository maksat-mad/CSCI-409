import React from 'react';
import './Ratings.css';
import {Link} from "react-router-dom";

const SignInToContinue = ({productId}) => {
    return (
        <div className={"button-container"}>
            <Link to={"/login"} state={{ prevPath: `/products/${productId}` }} style={{textDecoration: "none"}} >
                <div className={"ratings-button sign-in-to-continue-button"}>
                    Login to leave review
                </div>
            </Link>
        </div>
    );
};

export default SignInToContinue;