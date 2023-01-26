import React from 'react';
import CartCard from "../card/CartCard";
import {useSelector} from "react-redux";
import shopping from '../../../assets/UI/shopping.png';
import {Link} from "react-router-dom";
import './Cart.css';
import CartBuyButton from "../cart-parts/CartBuyButton";
import {useAuth} from "../../../context/AuthContext";
import LoginToBuy from "../cart-parts/LoginToBuy";
import CartBuyBottom from "../cart-parts/CartBuyBottom";

const Cart = () => {
    const { currentUser } = useAuth();

    const cartButton = useSelector(state => state.cartButtonClick);

    return (
        <>
            {cartButton ?
                <div>
                    <div className={"cart-container"}>Cart, Sum</div>
                    <div className={"cart-container"}>
                        <div>
                            <CartCard/>
                            <CartCard/>
                            <CartCard/>
                            <CartCard/>
                        </div>
                        {currentUser ?
                            <>
                                <CartBuyButton/>
                                <CartBuyBottom/>
                            </>
                            :
                            <LoginToBuy/>
                        }
                    </div>
                </div>
                :
                <>
                    <div className={"cart-container"}>
                        <h2>Cart is empty</h2>
                    </div>
                    <div className={"cart-container"}>
                        <img src={shopping} alt={"shopping"} style={{height: "300px"}}/>
                    </div>
                    <div className={"cart-container"}>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <h2>Go to the main</h2>
                        </Link>
                    </div>
                </>
            }
        </>
    );
};

export default Cart;