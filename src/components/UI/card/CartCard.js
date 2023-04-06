import React from 'react';
import '../../modal/Modal.css';
import './CartCard.css';
import {Link} from "react-router-dom";
import CartCardButtonsAndInput from "../cart-parts/CartCardButtonsAndInput";
import {useDispatch, useSelector} from "react-redux";

const CartCard = ({card, more_info, one_item, total, tg}) => {
    const dispatch = useDispatch();

    const cartItemsQuantity = useSelector(state => state.cartItemsQuantity);
    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);
    const cartItemsIds = useSelector(state => state.cartItemsIds);
    const cartItemsNumber = useSelector(state => state.cartItemsNumber);
    const cartItems = useSelector(state => state.cartItems);
    const totalMoney = useSelector(state => state.totalMoney);

    const handleDelete = () => {
        dispatch({type: 'TOTAL_MONEY', payload: totalMoney - cartItemsIdsAndQuantity.get(card.id) * 1000});
        dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - cartItemsIdsAndQuantity.get(card.id)});
        cartItemsIdsAndQuantity.delete(card.id);
        dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
        dispatch({type: 'CART_ITEMS_IDS',
            payload: cartItemsIds.map(id => {
                if (id !== card.id) {
                    return id;
                }
            }) });
        if (cartItemsNumber === 1) {
            dispatch({type: 'CART_BUTTON_CLICK', payload: false});
        }
        dispatch({type: 'CART_ITEMS_NUMBER', payload: cartItemsNumber - 1});
        cartItems.delete(card.id);
        dispatch({type: 'CART_ITEMS', payload: cartItems});
    }

    return (
        <div className={"cart-card"}>
            <div className={"mob-close close-outer"}>
                <span onClick={handleDelete} className="close close-inner black">&times;</span>
            </div>
            <div className={"cart-card-img"}>
                <img style={{width: "100%", height: "100%"}} src={card.url} alt={"cart"}/>
            </div>
            <div className={"cart-card-content"}>
                <div>
                    <h3 style={{margin: "0", padding: "0"}}>Item</h3><br/>
                    <Link to={`/products/${card.id}`} style={{textDecoration: "none"}}>
                        <p style={{margin: "0", padding: "0"}}>{more_info}</p><br/>
                    </Link><br/>
                    <CartCardButtonsAndInput cardId={card.id} maxValue={10}/>
                    <p style={{margin: "0", padding: "10px"}}>
                        {one_item} = 1000 {tg}
                        <br/>
                        {total} = {cartItemsIdsAndQuantity.get(card.id) * 1000} {tg}
                    </p>
                </div>
            </div>
            <div className={"web-close close-outer"}>
                <span onClick={handleDelete} className="close close-inner black">&times;</span>
            </div>
        </div>
    );
};

export default CartCard;