import React from 'react';
import './CartCard.css';
import apple from '../../../assets/apple.jpg';
import {Link} from "react-router-dom";
import CartCardButtonsAndInput from "../cart-parts/CartCardButtonsAndInput";

const CartCard = () => {
    return (
        <div className={"cart-card"}>
            <div className={"cart-card-img"}>
                <img style={{width: "100%", height: "100%"}} src={apple} alt={"cart"}/>
            </div>
            <div className={"cart-card-content"}>
                <div>
                    <h3 style={{margin: "0", padding:"0"}}>Meat</h3><br/>
                    <Link to={"/cart"} style={{textDecoration: "none"}}>
                        <h4 style={{margin: "0", padding:"0"}}>More info...</h4><br/>
                    </Link><br/>
                    <CartCardButtonsAndInput/>
                    <h4 style={{margin: "0", padding:"0"}}>2500 tg</h4><br/>
                </div>
            </div>
        </div>
    );
};

export default CartCard;