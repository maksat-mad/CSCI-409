import React from 'react';
import './CartCard.css';
import {Link} from "react-router-dom";
import CartCardButtonsAndInput from "../cart-parts/CartCardButtonsAndInput";
import {useSelector} from "react-redux";

const CartCard = ({card}) => {
    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);

    return (
        <div className={"cart-card"}>
            <div className={"cart-card-img"}>
                <img style={{width: "100%", height: "100%"}} src={card.url} alt={"cart"}/>
            </div>
            <div className={"cart-card-content"}>
                <div>
                    <h3 style={{margin: "0", padding: "0"}}>Item</h3><br/>
                    <Link to={`/products/${card.id}`} style={{textDecoration: "none"}}>
                        <p style={{margin: "0", padding: "0"}}>More info...</p><br/>
                    </Link><br/>
                    <CartCardButtonsAndInput cardId={card.id} maxValue={10}/>
                    <p style={{margin: "0", padding: "10px"}}>
                        One item = 1000 tg
                        <br/>
                        Total = {cartItemsIdsAndQuantity.get(card.id) * 1000} tg
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartCard;