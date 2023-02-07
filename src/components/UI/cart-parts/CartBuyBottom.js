import React from 'react';
import './CartBuyBottom.css';

const CartBuyBottom = ({money}) => {
    return (
        <div className={"cart-buy-bottom"}>
            <h2>{money} tg</h2>
            <h2>But Now</h2>
        </div>
    );
};

export default CartBuyBottom;