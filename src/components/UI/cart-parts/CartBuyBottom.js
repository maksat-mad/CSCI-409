import React from 'react';
import './CartBuyBottom.css';
import {Link} from "react-router-dom";

const CartBuyBottom = ({money}) => {
    return (
        <Link to={'/buy'} className={"cart-buy-bottom"} style={{textDecoration: "none"}}>
            <h2>{money} tg</h2>
            <h2>But Now</h2>
        </Link>
    );
};

export default CartBuyBottom;