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
                <a href={"/App/"}>Fruits</a>
                <a href={"/App/"}>Vegetables</a>
                <a href={"/App/"}>Drinks</a>
                <a href={"/App/"}>Meats</a>
            </div>
        </div>
    );
};

export default DropDown;