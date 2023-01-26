import React from 'react';
import './CartBuyButton.css';
import cartBuyButton from "../../../assets/UI/buy-button.png";

const CartBuyButton = () => {
    return (
        <div className={"cart-buy-button"}>
            <h2 className={"cart-buy-money"}>2500 tg</h2>
            <img className={"cart-buy-button-icon"} src={cartBuyButton} alt={"cart"}/>
        </div>
    );
};

export default CartBuyButton;