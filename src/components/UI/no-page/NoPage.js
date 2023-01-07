import React from 'react';
import './NoPage.css';
import {Link} from "react-router-dom";

const NoPage = () => {
    return (
        <div className={"no-page"}>
            <div className={"container"}>
                <h1>No such page</h1>
            </div>
            <div className={"my-container"}>
                <Link to="/">Go to home page</Link>
            </div>
        </div>
    );
};

export default NoPage;