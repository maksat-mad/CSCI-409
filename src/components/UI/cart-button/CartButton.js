import React from 'react';
import './CartButton.css';
import cartIcon from '../../../assets/UI/carts.png';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const CartButton = () => {
    const cartItemsNumber = useSelector(state => state.cartItemsNumber);

    return (
        <div className={"cart-button"}>
            <Link to={"/cart"} style={{textDecoration: "none"}}>
                <span>
                    <h2 className={"cart-number"}>{cartItemsNumber}</h2>
                    <img className={"cart-icon"} src={cartIcon} alt={"cart"}/>
                </span>
            </Link>
        </div>
    );
};

export default CartButton;