import React from 'react';
import '../card/Card.css';
import '../card/ReviewCard.css';
import shopping from '../../../assets/UI/shopping.png';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Buy = () => {
    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);
    const totalMoney = useSelector(state => state.totalMoney);
    const cartItems = useSelector(state => state.cartItems);

    return (
        <div>
            {cartItems.size !== 0 ?
                <>
                    <div className={"container"}>
                        <h2>Products you are going to buy</h2>
                    </div>
                    <div className={"container"}>
                        <div className={"review-card"}>
                            <div>
                                {[...cartItems].map(([id, card], index) => {
                                    return <div className={"container-buy-items"}>
                                        <p style={{fontWeight: 'bold'}}>{index + 1}) Item</p>
                                        <div className={"buy-items-content"}>
                                            <div> One item cost: {1000} tg</div>
                                            <div> Number of items: {cartItemsIdsAndQuantity.get(id)}</div>
                                            <div>Total cost: {cartItemsIdsAndQuantity.get(id) * 1000} tg</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={"container"} style={{marginTop: '-50px'}}>
                        <div>
                            <h3>Total cost = {totalMoney}</h3>
                            <input type={"tel"}/>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={"cart-container"}>
                        <h2>No items to buy</h2>
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
        </div>
    );
};

export default Buy;