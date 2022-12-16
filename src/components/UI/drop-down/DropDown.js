import React from 'react';
import drop from '../../../assets/UI/drop.svg';
import './DropDown.css';

const DropDown = () => {
    return (
        <div className={"dropdown"}>
            <div className={"dropdown-btn"}>
                <img src={drop} alt={"drop"}/>
            </div>
            <div className={"dropdown-content"}>
                <a href={"/"}>Fruits</a>
                <a href={"/"}>Vegetables</a>
                <a href={"/"}>Drinks</a>
                <a href={"/"}>Meats</a>
            </div>
        </div>
    );
};

export default DropDown;