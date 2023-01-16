import React from 'react';
import drop from '../../../assets/UI/drop.svg';
import './DropDown.css';
import {Link} from "react-router-dom";

const DropDown = () => {
    return (
        <div className={"dropdown"}>
            <div className={"dropdown-btn"}>
                <img src={drop} alt={"drop"}/>
            </div>
            <div className={"dropdown-content"}>
                <Link to={"/fruits"}>
                    Fruits
                </Link>
                <Link to={"/vegetables"}>
                    Vegetables
                </Link>
                <Link to={"/drinks"}>
                    Drinks
                </Link>
                <Link to={"/meats"}>
                    Meats
                </Link>
            </div>
        </div>
    );
};

export default DropDown;