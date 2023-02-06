import React from 'react';
import './LoginToProceed.css';
import {Link} from "react-router-dom";

const LoginToProceed = ({text}) => {
    return (
        <>
            <Link to={"/login"} state={{ prevPath: "/cart" }} style={{textDecoration: "none"}} >
                <div className={"login-to-proceed-button"}>
                    {text}
                </div>
            </Link>
        </>
    );
};

export default LoginToProceed;