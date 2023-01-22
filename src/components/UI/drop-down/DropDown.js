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
                <Link to={"/search"} state={{ category: "fruits" }}>
                    Fruits
                </Link>
                <Link to={"/search"} state={{ category: "vegetables" }}>
                    Vegetables
                </Link>
                <Link to={"/search"} state={{ category: "drinks" }}>
                    Drinks
                </Link>
                <Link to={"/search"} state={{ category: "meats" }}>
                    Meats
                </Link>
            </div>
        </div>
    );
};

export default DropDown;