import React, {useState} from 'react';
import './CartButton.css';
import cartIcon from '../../../assets/UI/carts.png';
import {useSelector} from "react-redux";

const CartButton = () => {
    const cartItemsNumber = useSelector(state => state.cartItemsNumber);

    return (
        <div className={"cart-button"}>
            <span>
                <h2 className={"cart-number"}>{cartItemsNumber}</h2>
                <img className={"cart-icon"} src={cartIcon} alt={"cart"}/>
            </span>
        </div>
    );
};

export default CartButton;