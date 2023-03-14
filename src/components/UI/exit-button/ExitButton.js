import React from 'react';
import {Link} from "react-router-dom";
import exitIcon from "../../../assets/UI/exit.png";
import './ExitButton.css';

const ExitButton = ({link}) => {
    return (
        <div className={"exit-button"}>
            <Link to={link} style={{textDecoration: "none"}}>
                <img className={"exit-icon"} src={exitIcon} alt={"exit"}/>
            </Link>
        </div>
    );
};

export default ExitButton;