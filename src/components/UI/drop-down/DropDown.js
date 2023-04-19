import React from 'react';
import drop from '../../../assets/UI/menu.png';
import './DropDown.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

const DropDown = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleCategoryChange = (categoryName) => {
        dispatch({type: 'UPDATE_CATEGORY', payload: categoryName});
    }

    return (
        <div className={"dropdown"}>
            <div className={"dropdown-btn"}>
                <img src={drop} alt={"drop"} style={{width:"35px", height:"35px"}}/>
            </div>
            <div className={"dropdown-content"}>
                <Link to={"/category"} onClick={() => handleCategoryChange("fruits")}>
                    {t('fruits')}
                </Link>
                <Link to={"/category"} onClick={() => handleCategoryChange("vegetables")}>
                    {t('vegetables')}
                </Link>
                <Link to={"/category"} onClick={() => handleCategoryChange("drinks")}>
                    {t('drinks')}
                </Link>
                <Link to={"/category"} onClick={() => handleCategoryChange("meats")}>
                    {t('meats')}
                </Link>
            </div>
        </div>
    );
};

export default DropDown;