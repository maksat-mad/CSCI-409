import React from 'react';
import './CartCard.css';
import {Link} from "react-router-dom";
import CartCardButtonsAndInput from "../cart-parts/CartCardButtonsAndInput";

const CartCard = ({card}) => {
    return (
        <div className={"cart-card"}>
            <div className={"cart-card-img"}>
                <img style={{width: "100%", height: "100%"}} src={card.url} alt={"cart"}/>
            </div>
            <div className={"cart-card-content"}>
                <div>
                    <h3 style={{margin: "0", padding: "0"}}>Item</h3><br/>
                    <Link to={"/cart"} style={{textDecoration: "none"}}>
                        <h4 style={{margin: "0", padding: "0"}}>More info...</h4><br/>
                    </Link><br/>
                    <CartCardButtonsAndInput cardId={card.id} maxValue={5}/>
                    <h4 style={{margin: "0", padding: "10px"}}>1000 tg</h4><br/>
                </div>
            </div>
        </div>
    );
};

export default CartCard;