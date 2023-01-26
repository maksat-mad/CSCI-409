import React from 'react';
import './LoginToBuy.css';
import {Link} from "react-router-dom";

const LoginToBuy = () => {
    return (
        <>
            <Link to={"/login"} state={{ prevPath: "/cart" }} style={{textDecoration: "none"}} >
                <div className={"login-to-buy-button"}>
                    Login to Buy
                </div>
            </Link>
        </>
    );
};

export default LoginToBuy;