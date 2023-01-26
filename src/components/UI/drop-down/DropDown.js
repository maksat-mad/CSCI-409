import React from 'react';
import drop from '../../../assets/UI/menu.png';
import './DropDown.css';
import {Link} from "react-router-dom";

const DropDown = () => {
    return (
        <div className={"dropdown"}>
            <div className={"dropdown-btn"}>
                <img src={drop} alt={"drop"} style={{width:"35px", height:"35px"}}/>
            </div>
            <div className={"dropdown-content"}>
                <Link to={"/category"} state={{ category: "fruits" }}>
                    Fruits
                </Link>
                <Link to={"/category"} state={{ category: "vegetables" }}>
                    Vegetables
                </Link>
                <Link to={"/category"} state={{ category: "drinks" }}>
                    Drinks
                </Link>
                <Link to={"/category"} state={{ category: "meats" }}>
                    Meats
                </Link>
            </div>
        </div>
    );
};

export default DropDown;